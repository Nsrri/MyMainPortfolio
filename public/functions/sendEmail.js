const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handler = async (event) => {
  try {
    // Parse the incoming event body to extract name, email, subject, and message
    const { name, email, subject, message } = JSON.parse(event.body);

    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define mail options
    const mailOptions = {
      from: email,
      to: "nasrin.jafari@powercoders.org",
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };

    // Send email using Nodemailer transporter
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mail has been sent successfully!" }),
    };
  } catch (error) {
    // Handle errors, including parsing event body as JSON
    console.error("Error processing request:", error);

    // Return error response
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Invalid request. Please provide valid JSON data in the request body.",
      }),
    };
  }
};
