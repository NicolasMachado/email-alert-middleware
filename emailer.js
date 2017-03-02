'use strict';

const nodemailer = require('nodemailer');
const {logger} = require('./utilities/logger');

// stored in `.env` -- never store passwords, api keys
// etc. inside source code
const {SMTP_URL, ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env; 

const emailData = {
  from: `${ALERT_FROM_NAME}<${ALERT_FROM_EMAIL}>`,
  to: ALERT_TO_EMAIL,
  createSubject: function (errorName) {
    this.subject = `ALERT: a ${errorName} error occurred`;
  },
  createBody: function (errorName, errorMessage, errorStack) {
    this.html = `<h3>An error occured</h3><p>A ${errorName} error occurred and returned the following message: <blockquote>${errorMessage}.</blockquote></p><p>The error stack is: <blockquote>${errorStack}.</blockquote><p/>`;
    this.text = `An error occured\n\nA ${errorName} error occurred and returned the following message: ${errorMessage}.\n\nThe error stack is: ${errorStack}.`;
  }
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
