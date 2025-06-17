import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

// Create transporter
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

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    if (!name || !email || !phone || !query) {
      return res.status(400).json({
        message: "All fields are required (name, email, phone, query)",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, "").slice(-10))) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const mailOptions = {
      from: process.env.user, // Your email
      to: process.env.user, // Send to yourself
      replyTo: email, // Set reply-to as the contact person's email
      subject: `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4CAF50; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Query/Message:</h3>
            <p style="line-height: 1.6; color: #555;">${query}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Note:</strong> You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,

      text: `
        New Contact Form Submission
        
        Contact Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Submitted At: ${new Date().toLocaleString()}
        
        Query/Message:
        ${query}
        
        You can reply directly to this email to respond to ${name}.
      `,
    };

    await transporter.sendMail(mailOptions);

    const autoReplyOptions = {
      from: process.env.user,
      to: email,
      subject: "Thank you for contacting NSS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Thank You for Contacting Us!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to NSS. We have received your message and our team will review it shortly.</p>
          <p>We typically respond within 24-48 hours.</p>
          <p>Best regards,<br>NSS Team</p>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return res.status(200).json({
      message:
        "Your message has been sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      message: "Failed to send message. Please try again later.",
    });
  }
};
