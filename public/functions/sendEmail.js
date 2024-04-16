const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handler = async (event) => {
  try {
    // Parse the incoming event body to extract name, email, subject, and message
    const { name, email, subject, message } = parseBody(event.body);

    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "nasrin.jafari@powercoders.org",
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mail has been sent successfully!" }),
    };
  } catch (error) {
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

function parseBody(body) {
  // If the body is a string, attempt to parse it as JSON
  if (typeof body === "string") {
    return JSON.parse(body);
  }

  // If the body is already parsed or is not a string (e.g., form data), return it directly
  return body;
}
