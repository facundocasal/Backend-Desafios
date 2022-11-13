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
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});

// Function
const sendMail = async (mail, subject, body) => {
  const mailOptions = {
    from: "e-Commerce Fernando Diaz",
    to: mail,
    subject: subject,
    html: `<span>${body}</span>`,
  };

  const info = await transporter.sendMail(mailOptions);
};

// module.export = {
//   auth,
//   hashPassword,
//   isValidPassword,
//   validatePass,
//   isAdmin,
//   isLogged,
//   sendMail,
// };

module.exports = {
  hashPassword,
  isValidPassword,
  sendMail,
};