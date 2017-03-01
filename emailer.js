'use strict';

const nodemailer = require('nodemailer');
const {logger} = require('./utilities/logger');

// stored in `.env` -- never store passwords, api keys
// etc. inside source code
const {SMTP_URL, ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env; 

const emailData = {
  from: `${ALERT_FROM_NAME}<${ALERT_FROM_EMAIL}>`,
  to: ALERT_TO_EMAIL,
  subject: `There was an error`,
  text: `An error occured (plain text)`,
  html: `<p>An error occured (html)</p>`
};

const sendEmail = (emailData, smtpUrl=SMTP_URL) => {
  const transporter = nodemailer.createTransport(SMTP_URL);
  logger.info(`Attempting to send email from ${emailData.from}`); 
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
}

module.exports = {sendEmail, emailData};
