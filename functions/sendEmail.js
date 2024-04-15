// netlify/functions/sendEmail.js

const { PHPMailer } = require("phpmailer");

exports.handler = async (event) => {
  const { name, email, subject, message } = JSON.parse(event.body);
  const mail = new PHPMailer(true);

  try {
    mail.isSMTP();
    mail.Host = "smtp.gmail.com";
    mail.Port = 587;
    mail.SMTPSecure = "tls";
    mail.SMTPAuth = true;
    mail.Username = "nasrinjafari7597@gmail.com";
    mail.Password = "defn jjbw ondx jukq";

    mail.setFrom(email, name);
    mail.addAddress("nasrin.jafari@powercoders.org", "Narin");

    mail.Subject = subject;
    mail.Body = message;
    mail.isHTML(true);

    await mail.send();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mail has been sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Message could not be sent. Mailer Error: ${error.message}`,
      }),
    };
  }
};
