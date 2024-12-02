const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
let dotenv = require('dotenv').config();

const TOKEN = dotenv.parsed.mail_token;
const sender_mail = dotenv.parsed.mail_sender;
const reciver_mail = dotenv.parsed.mail_reciver;
const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: sender_mail,
  name: "Messenger",
};
const recipients = [
  reciver_mail,
];
const send_mail=(user)=>{
    transport.sendMail({
        from: sender,
        to: recipients,
        subject: "New Signup!",
        text: `We have a new Signup, ${user} has signed up!!`,
        category: "Integration Test",
      })
      .then(console.log, console.error);
}
module.exports = {
send_mail
};