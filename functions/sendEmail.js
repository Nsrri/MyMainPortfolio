const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handler = async (event) => {
  const { name, email, subject, message } = JSON.parse(event.body);

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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mail has been sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Message could not be sent. Mailer Error: ${error.message}`,
      }),
    };
  }
};
