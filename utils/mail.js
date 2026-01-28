const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: "tfgpruebas6@gmail.com",
    pass: "qcdl baau vwar gcvw"
  }
});

async function enviarCorreo(asunto, mensaje, destino) {
  const mailOptions = {
    from: "tfgpruebas6@gmail.com",
    to: destino,
    subject: asunto,
    text: mensaje
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado");
  } catch (err) {
    console.log("Error enviando correo:", err);
  }
}

module.exports = enviarCorreo;
