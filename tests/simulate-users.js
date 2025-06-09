import axios from "axios";
import chalk from "chalk";
import { faker } from "@faker-js/faker";

const BASE_URL = "http://localhost:3000";
const CONCURRENT_USERS = 25;
const TEST_DURATION = 120000;

const config = {
  totalUsers: CONCURRENT_USERS,
  registrationUsers: Math.floor(CONCURRENT_USERS * 0.4),
  browsingUsers: Math.floor(CONCURRENT_USERS * 0.4),
  eventRegUsers: Math.floor(CONCURRENT_USERS * 0.2),
};

const stats = {
  requests: {
    total: 0,
    successful: 0,
    failed: 0,
  },
  responseTimes: [],
  errors: [],
  startTime: Date.now(),
};

const generateVolunteerData = () => ({
  studentDetails: {
    name: faker.person.fullName(),
    email: faker.internet.email().replace("@", `${Date.now()}@`),
    sapId: faker.string.numeric(11),
    phoneNumber: faker.phone.number("##########"),
    course: faker.helpers.arrayElement(["B.Tech", "M.Tech", "MBA", "MCA"]),
    branch: faker.helpers.arrayElement([
      "CSE",
      "IT",
      "ECE",
      "MECH",
      "CIVIL",
      "CHEM",
    ]),
    year: faker.helpers.arrayElement(["1", "2", "3", "4"]),
    section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
    caste: faker.helpers.arrayElement(["General", "OBC", "SC", "ST"]),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    hobbies: faker.helpers
      .arrayElements(["Reading", "Sports", "Music", "Dance", "Art"], 2)
      .join(", "),
    password: "TestPass123!",
  },
  parentDetails: {
    fatherName: faker.person.fullName(),
    motherName: faker.person.fullName(),
    parentPhone: faker.phone.number("##########"),
    fatherEmail: faker.internet.email(),
    motherEmail: faker.internet.email(),
    description: faker.lorem.sentence(),
  },
});

// Log function with colors
const log = {
  info: (msg) => console.log(chalk.blue(`ℹ️  ${msg}`)),
  success: (msg) => console.log(chalk.green(`✅ ${msg}`)),
  error: (msg) => console.log(chalk.red(`❌ ${msg}`)),
  warning: (msg) => console.log(chalk.yellow(`⚠️  ${msg}`)),
  header: (msg) => console.log(chalk.cyan.bold(`\n🚀 ${msg}`)),
  stat: (msg) => console.log(chalk.magenta(`📊 ${msg}`)),
};

// Track request performance
const trackRequest = async (requestFunc, description, userId) => {
  const startTime = Date.now();
  stats.requests.total++;

  try {
    const result = await requestFunc();
    const duration = Date.now() - startTime;
    stats.responseTimes.push(duration);
    stats.requests.successful++;

    log.success(`User ${userId}: ${description} completed in ${duration}ms`);
    return { success: true, duration, data: result.data };
  } catch (error) {
    const duration = Date.now() - startTime;
    stats.requests.failed++;
    stats.errors.push({
      description,
      error: error.response?.data?.message || error.message,
      status: error.response?.status,
      userId,
    });

    log.error(
      `User ${userId}: ${description} failed - ${
        error.response?.data?.message || error.message
      }`
    );
    return { success: false, duration, error: error.message };
  }
};

// Simulate volunteer registration
const simulateVolunteerRegistration = async (userId) => {
  const volunteerData = generateVolunteerData();

  return await trackRequest(
    () => axios.post(`${BASE_URL}/volunteer/signup`, volunteerData),
    "Volunteer registration",
    userId
  );
};

// Simulate event browsing
const simulateBrowsing = async (userId) => {
  const results = [];

  // Browse upcoming events
  results.push(
    await trackRequest(
      () => axios.get(`${BASE_URL}/events/upcoming-events`),
      "Browse upcoming events",
      userId
    )
  );

  // Wait like a real user
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  // Browse past events
  results.push(
    await trackRequest(
      () => axios.get(`${BASE_URL}/events/past-events`),
      "Browse past events",
      userId
    )
  );

  // Test cache hit by browsing upcoming again
  await new Promise((resolve) => setTimeout(resolve, 500));
  results.push(
    await trackRequest(
      () => axios.get(`${BASE_URL}/events/upcoming-events`),
      "Browse upcoming events (cache test)",
      userId
    )
  );

  return results;
};

// Simulate event registration flow
const simulateEventRegistration = async (userId) => {
  const results = [];

  // First browse events
  const browseResult = await trackRequest(
    () => axios.get(`${BASE_URL}/events/upcoming-events`),
    "Browse events for registration",
    userId
  );

  if (!browseResult.success) return [browseResult];

  // Try to login (using test credentials)
  const loginResult = await trackRequest(
    () =>
      axios.post(`${BASE_URL}/volunteer/login`, {
        sapId: `${60000000000 + userId}`, // Unique test IDs
        password: "TestPass123!",
      }),
    "Volunteer login",
    userId
  );

  results.push(browseResult, loginResult);

  if (loginResult.success && loginResult.data?.token) {
    // If login successful, try to browse with auth
    const authBrowse = await trackRequest(
      () =>
        axios.get(`${BASE_URL}/events/upcoming-events`, {
          headers: { Authorization: `Bearer ${loginResult.data.token}` },
        }),
      "Authenticated browsing",
      userId
    );
    results.push(authBrowse);
  }

  return results;
};

// Health check
const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/health`, { timeout: 5000 });
    log.success("Server is healthy and ready for testing");
    return true;
  } catch (error) {
    log.error("Server health check failed!");
    log.error("Make sure your server is running: npm start or node index.js");
    return false;
  }
};

// Calculate statistics
const calculateStats = () => {
  const totalTime = Date.now() - stats.startTime;
  const avgResponseTime =
    stats.responseTimes.length > 0
      ? stats.responseTimes.reduce((a, b) => a + b, 0) /
        stats.responseTimes.length
      : 0;

  const p95 =
    stats.responseTimes.length > 0
      ? stats.responseTimes.sort((a, b) => a - b)[
          Math.floor(stats.responseTimes.length * 0.95)
        ]
      : 0;

  const successRate =
    stats.requests.total > 0
      ? ((stats.requests.successful / stats.requests.total) * 100).toFixed(2)
      : 0;

  return {
    totalTime,
    avgResponseTime: Math.round(avgResponseTime),
    p95ResponseTime: Math.round(p95),
    successRate,
    requestsPerSecond: Math.round(stats.requests.total / (totalTime / 1000)),
  };
};

// Print detailed results
const printResults = () => {
  const calculatedStats = calculateStats();

  log.header("LOAD TEST RESULTS");
  console.log(chalk.cyan("=".repeat(50)));

  log.stat(`Total Test Duration: ${calculatedStats.totalTime}ms`);
  log.stat(`Total Requests: ${stats.requests.total}`);
  log.stat(`Successful Requests: ${stats.requests.successful}`);
  log.stat(`Failed Requests: ${stats.requests.failed}`);
  log.stat(`Success Rate: ${calculatedStats.successRate}%`);
  log.stat(`Average Response Time: ${calculatedStats.avgResponseTime}ms`);
  log.stat(
    `95th Percentile Response Time: ${calculatedStats.p95ResponseTime}ms`
  );
  log.stat(`Requests Per Second: ${calculatedStats.requestsPerSecond}`);

  // Performance assessment
  console.log(chalk.cyan("\n🎯 PERFORMANCE ASSESSMENT:"));

  if (calculatedStats.successRate >= 95) {
    log.success(`Success Rate: EXCELLENT (${calculatedStats.successRate}%)`);
  } else if (calculatedStats.successRate >= 90) {
    log.warning(`Success Rate: GOOD (${calculatedStats.successRate}%)`);
  } else {
    log.error(
      `Success Rate: NEEDS IMPROVEMENT (${calculatedStats.successRate}%)`
    );
  }

  if (calculatedStats.avgResponseTime <= 1000) {
    log.success(
      `Response Time: EXCELLENT (${calculatedStats.avgResponseTime}ms avg)`
    );
  } else if (calculatedStats.avgResponseTime <= 2000) {
    log.warning(
      `Response Time: ACCEPTABLE (${calculatedStats.avgResponseTime}ms avg)`
    );
  } else {
    log.error(`Response Time: SLOW (${calculatedStats.avgResponseTime}ms avg)`);
  }

  if (calculatedStats.requestsPerSecond >= 10) {
    log.success(
      `Throughput: EXCELLENT (${calculatedStats.requestsPerSecond} req/s)`
    );
  } else if (calculatedStats.requestsPerSecond >= 5) {
    log.warning(
      `Throughput: ACCEPTABLE (${calculatedStats.requestsPerSecond} req/s)`
    );
  } else {
    log.error(`Throughput: LOW (${calculatedStats.requestsPerSecond} req/s)`);
  }

  // Error summary
  if (stats.errors.length > 0) {
    console.log(chalk.red("\n🐛 ERROR SUMMARY:"));
    const errorGroups = {};
    stats.errors.forEach((err) => {
      const key = `${err.error} (${err.status || "No status"})`;
      errorGroups[key] = (errorGroups[key] || 0) + 1;
    });

    Object.entries(errorGroups).forEach(([error, count]) => {
      log.error(`${error}: ${count} occurrences`);
    });
  }

  // Final verdict
  const overallScore =
    (calculatedStats.successRate >= 95 ? 1 : 0) +
    (calculatedStats.avgResponseTime <= 1000 ? 1 : 0) +
    (calculatedStats.requestsPerSecond >= 10 ? 1 : 0);

  console.log(chalk.cyan("\n🏆 FINAL VERDICT:"));
  if (overallScore === 3) {
    console.log(
      chalk.green.bold("🎉 EXCELLENT! Your backend is ready for production! 🚀")
    );
  } else if (overallScore === 2) {
    console.log(
      chalk.yellow.bold(
        "👍 GOOD! Your backend can handle the load with minor optimizations needed."
      )
    );
  } else {
    console.log(
      chalk.red.bold(
        "⚠️  NEEDS OPTIMIZATION! Consider reviewing performance bottlenecks."
      )
    );
  }
};

// Main simulation function
const runLoadTest = async () => {
  log.header(
    `STARTING NSS BACKEND LOAD TEST - ${CONCURRENT_USERS} CONCURRENT USERS`
  );

  // Create user simulation promises
  const userPromises = [];

  // Registration users (40%)
  for (let i = 1; i <= config.registrationUsers; i++) {
    userPromises.push(simulateVolunteerRegistration(i));
  }

  // Browsing users (40%)
  for (
    let i = config.registrationUsers + 1;
    i <= config.registrationUsers + config.browsingUsers;
    i++
  ) {
    userPromises.push(simulateBrowsing(i));
  }

  // Event registration users (20%)
  for (
    let i = config.registrationUsers + config.browsingUsers + 1;
    i <= CONCURRENT_USERS;
    i++
  ) {
    userPromises.push(simulateEventRegistration(i));
  }

  log.info(
    `Simulating ${config.registrationUsers} registration users, ${config.browsingUsers} browsing users, ${config.eventRegUsers} event registration users`
  );

  // Execute all concurrent operations
  try {
    await Promise.allSettled(userPromises);
  } catch (error) {
    log.error(`Simulation error: ${error.message}`);
  }

  printResults();
};

// Edge case testing
const runEdgeCaseTests = async () => {
  log.header("RUNNING EDGE CASE TESTS");

  const edgeCases = [
    {
      name: "Duplicate Email Registration",
      test: () =>
        axios.post(`${BASE_URL}/volunteer/signup`, {
          ...generateVolunteerData(),
          studentDetails: {
            ...generateVolunteerData().studentDetails,
            email: "duplicate@test.com", // Same email
          },
        }),
    },
    {
      name: "Invalid Login Credentials",
      test: () =>
        axios.post(`${BASE_URL}/volunteer/login`, {
          sapId: "00000000000",
          password: "wrongpassword",
        }),
    },
    {
      name: "Invalid Event ID",
      test: () => axios.get(`${BASE_URL}/events/nonexistent-event`),
    },
    {
      name: "Malformed JSON Request",
      test: () =>
        axios.post(`${BASE_URL}/volunteer/signup`, {
          invalid: "data",
          missing: "required fields",
        }),
    },
  ];

  for (const edgeCase of edgeCases) {
    await trackRequest(edgeCase.test, edgeCase.name, "EdgeCase");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Brief pause between tests
  }

  log.success("Edge case testing completed");
};

// Main execution
const main = async () => {
  console.clear();
  log.header("NSS BACKEND COMPREHENSIVE TESTING SUITE");

  // Health check first
  const isHealthy = await checkServerHealth();
  if (!isHealthy) {
    process.exit(1);
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Run load test
  await runLoadTest();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Run edge case tests
  await runEdgeCaseTests();

  log.header("ALL TESTS COMPLETED");
};

// Handle graceful shutdown
process.on("SIGINT", () => {
  log.warning("Test interrupted by user");
  printResults();
  process.exit(0);
});

// Run the tests
main().catch((error) => {
  log.error(`Test suite failed: ${error.message}`);
  process.exit(1);
});
