import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 OTP requests per windowMs
  message: "Too many OTP requests from this IP, please try again later.",
});

export const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 password reset requests per windowMs
  message: "Too many password reset requests from this IP, please try again later.",
});