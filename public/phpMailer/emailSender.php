<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (!empty($_POST['name'] && !empty($_POST['email']))) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 2;
    $mail->isSMTP();
    $mail->Host     = 'smtp.gmail.com;';
    $mail->SMTPAuth = true;
    $mail->Username = 'nasrinjafari7597@gmail.com';
    $mail->Password = 'defn jjbw ondx jukq';
    $mail->SMTPSecure = 'tls';
    $mail->Port     = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('nasrin.jafari@powercoders.org', 'Narin');

    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');   

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->AltBody = 'Body in plain text for non-HTML mail clients';
    $mail->send();
    echo "Mail has been sent successfully!";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
}

