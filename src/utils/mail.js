const nodemailer = require('nodemailer');

const emailUser = "jamestautiva@gmail.com";
const emailPass = "";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass,
    },
})


