const nodemailer = require('nodemailer') ;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) =>{
   const passwordHash = bcrypt.hashSync(password,saltRounds);
   return passwordHash 
}
const isValidPassword = async (password , hashPassword) =>{
  return bcrypt.compareSync(password, hashPassword)
}



//// MAILER ////

//config

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMINEMAIL,
    pass: process.env.MAILPASS ,
  },
});

// Function
const sendMail = async (mail, subject, body) => {
  const mailOptions = {
    from: "e-Commerce Backend CoderHouse",
    to: mail,
    subject: subject,
    html: `<span>${body}</span>`,
  };

  await transporter.sendMail(mailOptions);
};


module.exports = {
  hashPassword,
  isValidPassword,
  sendMail,
};