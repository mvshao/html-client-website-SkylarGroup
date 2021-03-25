<?php
$name = $_POST['name'];
$email = $_POST['email'];
$sender = 'info@skylargroup.pl';
$message = $_POST['message'];
$subject = $_POST['subject'];
header('Content-Type: application/json');
if ($name === ''){
print json_encode(array('message' => 'Wpisz swoje imię!', 'code' => 0));
exit();
}
if ($email === ''){
print json_encode(array('message' => 'Email nie może być pusty!', 'code' => 0));
exit();
} else {
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
print json_encode(array('message' => 'Niepoprawny format adresu email!.', 'code' => 0));
exit();
}
}
if ($subject === ''){
print json_encode(array('message' => 'Temat nie może być pusty!', 'code' => 0));
exit();
}
if ($message === ''){
print json_encode(array('message' => 'Wpisz treść wiadomości!', 'code' => 0));
exit();
}
$content="From: $name \nEmail: $email \nMessage: $message";
$recipient = "Biuro@biznesmate.pl";
$mailheader = "From: $sender \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Pomyślnie wysłano wiadomość!', 'code' => 1));
exit();
?>