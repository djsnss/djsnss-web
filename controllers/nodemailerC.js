import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
  port: 465,
  secure: true,
});

const sendSignup = async (req, res) => {
  try {
    const { email } = req.body;
    await transporter.sendMail({
      from: process.env.user,
      to: email,
      subject: "Welcome to platform",
      text: `You have successfully signed up as a volunteer in NSS`,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendLogin = async (req, res) => {
  try {
    const { email } = req.body;
    await transporter.sendMail({
      from: process.env.user,
      to: email,
      subject: "Login notification",
      text: `You have successfully logged in to NSS website`,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.user, // Your email
      pass: process.env.pass, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.user,
    to: email,
    subject: "OTP for Password Change",
    text: `Your OTP for password change is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendSignup, sendLogin, sendOTP };
