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
  }
};

module.exports.subscribeOptions = (email) => {
  return {
    from: 'no-reply@bitcointrix.com',
    to: email,
    subject: 'Introducción a Bitcoin - Bitcointrix',
    text: `Hola ironhacker,\n\n
          .Gracias por suscribirte al servicio de mailing de Bitcointrix.\n
          Adjunto encontrarás el paper.\n\n
          Saludos cordiales,\n
          El equipo de Bitcointrix.`,
    attachments: [
      {
        path: 'file:///home/sergio/Descargas/exampleSecondProyect.pdf'
      }
    ]
  }
};
