import axios from "axios";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";

// Edge case tests with expected behaviors
const edgeCases = [
  {
    name: "Duplicate Email Registration",
    description: "Should reject registration with existing email",
    test: async () => {
      const duplicateData = {
        studentDetails: {
          name: "Test User",
          email: "duplicate@test.com",
          sapId: "60001234567",
          phoneNumber: "9876543210",
          course: "B.Tech",
          branch: "CSE",
          year: "3",
          section: "A",
          caste: "General",
          gender: "Male",
          hobbies: "Reading",
          password: "TestPass123!",
        },
        parentDetails: {
          fatherName: "Test Father",
          motherName: "Test Mother",
          parentPhone: "9876543210",
          fatherEmail: "father@test.com",
          motherEmail: "mother@test.com",
          description: "Test description",
        },
      };

      // Try to register twice with same email
      await axios.post(`${BASE_URL}/volunteer/signup`, duplicateData);
      return axios.post(`${BASE_URL}/volunteer/signup`, duplicateData);
    },
    expectedStatus: 400,
    expectedError: true,
  },

  {
    name: "Invalid SAP ID Format",
    description: "Should reject invalid SAP ID format",
    test: async () => {
      return axios.post(`${BASE_URL}/volunteer/signup`, {
        studentDetails: {
          name: "Test User",
          email: "test@test.com",
          sapId: "123", // Invalid - too short
          phoneNumber: "9876543210",
          course: "B.Tech",
          branch: "CSE",
          year: "3",
          section: "A",
          caste: "General",
          gender: "Male",
          hobbies: "Reading",
          password: "TestPass123!",
        },
        parentDetails: {
          fatherName: "Test Father",
          motherName: "Test Mother",
          parentPhone: "9876543210",
          fatherEmail: "father@test.com",
          motherEmail: "mother@test.com",
          description: "Test description",
        },
      });
    },
    expectedStatus: 400,
    expectedError: true,
  },

  {
    name: "Missing Required Fields",
    description: "Should reject registration with missing required fields",
    test: async () => {
      return axios.post(`${BASE_URL}/volunteer/signup`, {
        studentDetails: {
          name: "Test User",
          // Missing email, sapId, etc.
        },
        parentDetails: {},
      });
    },
    expectedStatus: 400,
    expectedError: true,
  },

  {
    name: "Invalid Login Credentials",
    description: "Should reject login with wrong credentials",
    test: async () => {
      return axios.post(`${BASE_URL}/volunteer/login`, {
        sapId: "00000000000",
        password: "wrongpassword",
      });
    },
    expectedStatus: 400,
    expectedError: true,
  },

  {
    name: "Unauthorized Admin Access",
    description: "Should reject admin operations without token",
    test: async () => {
      return axios.get(`${BASE_URL}/admin/getAllVolunteers`);
    },
    expectedStatus: 401,
    expectedError: true,
  },

  {
    name: "Invalid Event Access",
    description: "Should handle non-existent event gracefully",
    test: async () => {
      return axios.get(`${BASE_URL}/admin/event/nonexistent-id`);
    },
    expectedStatus: [400, 404, 500], // Could be any of these
    expectedError: true,
  },

  {
    name: "Large File Upload",
    description: "Should reject files larger than limit",
    test: async () => {
      // Create a large fake file buffer (8MB - exceeding 7MB limit)
      const largeFile = Buffer.alloc(8 * 1024 * 1024, "a");
      const FormData = (await import("form-data")).default;
      const form = new FormData();
      form.append("passport", largeFile, "large-file.jpg");

      return axios.post(`${BASE_URL}/volunteer/signup`, form, {
        headers: form.getHeaders(),
      });
    },
    expectedStatus: 413, // Payload too large
    expectedError: true,
  },

  {
    name: "Malformed JSON",
    description: "Should handle malformed JSON gracefully",
    test: async () => {
      return axios.post(`${BASE_URL}/volunteer/signup`, "invalid-json", {
        headers: { "Content-Type": "application/json" },
      });
    },
    expectedStatus: 400,
    expectedError: true,
  },

  {
    name: "SQL Injection Attempt",
    description: "Should prevent SQL injection in email field",
    test: async () => {
      return axios.post(`${BASE_URL}/volunteer/login`, {
        sapId: "60001234567",
        password: "'; DROP TABLE volunteers; --",
      });
    },
    expectedStatus: [400, 401], // Should fail safely
    expectedError: true,
  },

  {
    name: "Rate Limit Test",
    description: "Should enforce rate limits on OTP requests",
    test: async () => {
      const requests = [];
      // Try to send 10 OTP requests rapidly
      for (let i = 0; i < 10; i++) {
        requests.push(
          axios
            .post(`${BASE_URL}/admin/send-otp`, {
              // This should trigger rate limiting after 5 requests
            })
            .catch((err) => err.response)
        );
      }
      const results = await Promise.all(requests);
      // At least some should be rate limited
      const rateLimited = results.some((r) => r?.status === 429);
      if (!rateLimited) {
        throw new Error("Rate limiting not working");
      }
      return { status: 429 }; // Simulate rate limited response
    },
    expectedStatus: 429,
    expectedError: true,
  },
];

// Performance stress tests
const stressTests = [
  {
    name: "Memory Stress Test",
    description: "Send many large requests to test memory handling",
    test: async () => {
      const largeData = {
        studentDetails: {
          name: "A".repeat(1000), // Large name
          email: `test${Date.now()}@test.com`,
          sapId: "60001234567",
          phoneNumber: "9876543210",
          course: "B.Tech",
          branch: "CSE",
          year: "3",
          section: "A",
          caste: "General",
          gender: "Male",
          hobbies: "Reading, ".repeat(100), // Large hobbies
          password: "TestPass123!",
        },
        parentDetails: {
          fatherName: "B".repeat(500),
          motherName: "C".repeat(500),
          parentPhone: "9876543210",
          fatherEmail: "father@test.com",
          motherEmail: "mother@test.com",
          description: "D".repeat(1000), // Large description
        },
      };

      return axios.post(`${BASE_URL}/volunteer/signup`, largeData);
    },
    expectedStatus: [200, 400], // Could succeed or fail validation
    expectedError: false,
  },

  {
    name: "Rapid Fire Requests",
    description: "Send many requests rapidly to test connection handling",
    test: async () => {
      const requests = [];
      for (let i = 0; i < 50; i++) {
        requests.push(
          axios
            .get(`${BASE_URL}/events/upcoming-events`)
            .catch((err) => err.response)
        );
      }
      const results = await Promise.all(requests);
      const successCount = results.filter((r) => r?.status === 200).length;
      if (successCount < 40) {
        // At least 80% should succeed
        throw new Error(`Only ${successCount}/50 requests succeeded`);
      }
      return { status: 200, successCount };
    },
    expectedStatus: 200,
    expectedError: false,
  },
];

// Run edge case tests
const runEdgeCaseTests = async () => {
  console.log("\n🐛 RUNNING EDGE CASE TESTS\n");
  console.log("=".repeat(50));

  const results = [];

  for (const testCase of edgeCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log(`   ${testCase.description}`);

    try {
      const result = await testCase.test();
      const status = result.status || result.response?.status;
      const expectedStatuses = Array.isArray(testCase.expectedStatus)
        ? testCase.expectedStatus
        : [testCase.expectedStatus];

      if (expectedStatuses.includes(status)) {
        console.log(`   ✅ PASS - Got expected status ${status}`);
        results.push({
          name: testCase.name,
          status: "PASS",
          actualStatus: status,
        });
      } else {
        console.log(
          `   ❌ FAIL - Got status ${status}, expected ${testCase.expectedStatus}`
        );
        results.push({
          name: testCase.name,
          status: "FAIL",
          actualStatus: status,
        });
      }
    } catch (error) {
      const status = error.response?.status;
      const expectedStatuses = Array.isArray(testCase.expectedStatus)
        ? testCase.expectedStatus
        : [testCase.expectedStatus];

      if (testCase.expectedError && expectedStatuses.includes(status)) {
        console.log(`   ✅ PASS - Got expected error with status ${status}`);
        results.push({
          name: testCase.name,
          status: "PASS",
          actualStatus: status,
        });
      } else {
        console.log(`   ❌ FAIL - Unexpected error: ${error.message}`);
        results.push({
          name: testCase.name,
          status: "FAIL",
          error: error.message,
        });
      }
    }

    // Brief pause between tests
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
};

// Run stress tests
const runStressTests = async () => {
  console.log("\n💪 RUNNING STRESS TESTS\n");
  console.log("=".repeat(50));

  const results = [];

  for (const testCase of stressTests) {
    console.log(`\n🔥 Testing: ${testCase.name}`);
    console.log(`   ${testCase.description}`);

    try {
      const result = await testCase.test();
      console.log(`   ✅ PASS - ${testCase.name} completed successfully`);
      results.push({ name: testCase.name, status: "PASS", result });
    } catch (error) {
      console.log(`   ❌ FAIL - ${error.message}`);
      results.push({
        name: testCase.name,
        status: "FAIL",
        error: error.message,
      });
    }
  }

  return results;
};

// Generate test report
const generateReport = (edgeResults, stressResults) => {
  const totalTests = edgeResults.length + stressResults.length;
  const passedTests = [...edgeResults, ...stressResults].filter(
    (r) => r.status === "PASS"
  ).length;
  const failedTests = totalTests - passedTests;

  console.log("\n📊 TEST REPORT\n");
  console.log("=".repeat(50));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log(
    `Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`
  );

  console.log("\n🔍 EDGE CASE RESULTS:");
  edgeResults.forEach((result) => {
    const icon = result.status === "PASS" ? "✅" : "❌";
    console.log(`   ${icon} ${result.name}`);
  });

  console.log("\n💪 STRESS TEST RESULTS:");
  stressResults.forEach((result) => {
    const icon = result.status === "PASS" ? "✅" : "❌";
    console.log(`   ${icon} ${result.name}`);
  });

  if (passedTests === totalTests) {
    console.log("\n🎉 ALL TESTS PASSED! Your backend is robust and secure! 🚀");
  } else if (passedTests / totalTests >= 0.8) {
    console.log(
      "\n👍 Most tests passed. Your backend is generally solid with minor issues."
    );
  } else {
    console.log(
      "\n⚠️  Several tests failed. Consider reviewing error handling and validation."
    );
  }
};

// Main execution
const main = async () => {
  console.log("🔒 NSS BACKEND EDGE CASE & STRESS TESTING");
  console.log("==========================================");

  // Check server health
  try {
    await axios.get(`${BASE_URL}/health`, { timeout: 5000 });
    console.log("✅ Server is healthy, starting tests...");
  } catch (error) {
    console.log("❌ Server health check failed!");
    console.log("   Make sure your server is running: npm start");
    process.exit(1);
  }

  const edgeResults = await runEdgeCaseTests();
  const stressResults = await runStressTests();

  generateReport(edgeResults, stressResults);
};

main().catch((error) => {
  console.error("Test suite failed:", error.message);
  process.exit(1);
});
