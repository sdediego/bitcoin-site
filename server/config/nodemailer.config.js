require('dotenv').config();

module.exports.transporter = {
  service: 'gmail',
  auth: {
    user: process.env.serverEmail,
    pass: process.env.serverEmailPassword
  }
};

module.exports.mailOptions = (req, user, token) => {
  return {
    from: 'no-reply@bitcointrix.com',
    to: user.email,
    subject: 'Verificación de cuenta Bitcointrix',
    text: `Hola ${user.username},\n\n
          Por favor, verifica tu cuenta haciendo click en el siguiente enlace:\n
          ${process.env.domainUrl}\/verification\/${token.token}\n\n
          Saludos cordiales,\n
          Bitcointrix.`
    /*text: `Hello ${user.username},\n\n
          Please verify your account by clicking the following link:\n
          http:\/\/${req.headers.host}\/api\/verification\/${token.token}\n\n
          kind regards,\n
          Bitcoin bitacora team.`*/
  }
};

module.exports.subscribeOptions = (email) => {
  return {
    from: 'no-reply@bitcointrix.com',
    to: email,
    subject: 'Introducción a Bitcoin - Bitcointrix',
    text: `Hola ironhacker,\n\n
          .`
  }
};
