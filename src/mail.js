"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendNewMail(name, email, social, phone, message) {
  const info = await transporter.sendMail({
    from: 'Arif Pirxada arifpirxada.netlify.app',
    to: "arifpirxada@gmail.com",
    subject: "New message from portfolio website ✔",
    // text: "Hello world?",
    html: `<div>
    <h3>Sender details:</h3>
    <p><b>Name:</b>&nbsp;${name}</p>
    <p><b>Email:</b>&nbsp;${email}</p>
    <p><b>Social:</b>&nbsp;${social}</p>
    <p><b>Phone:</b>&nbsp;${phone}</p><br>
    <p><b>Message:</b>&nbsp;${message}</p>
    <p>Follow the link below:</p><br>
    <a>https://arifpirxada.netlify.app/</a>
</div>`,
  });

//   console.log("Message sent: %s", info.messageId);
}

module.exports = sendNewMail;