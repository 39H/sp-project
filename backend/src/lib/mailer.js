const nodemailer = require('nodemailer');

const {
    SMTP_HOST: host,
    SMTP_PORT: port,
    SMTP_USER: user,
    SMTP_PASSWORD: pass,
} = process.env;

let smtpConfig = {
    host,
    port,
    secure: true,
    auth: {
        user,
        pass
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;