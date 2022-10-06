const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  sendResetPassword({ receiver, id, token }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_SENDER,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: receiver,
      subject: "Keep'Up - Reset Password",
      html: `
          <img src="https://firebasestorage.googleapis.com/v0/b/keepup-oclock.appspot.com/o/assets%2FKeep%E2%80%99Up.png?alt=media&token=d6b9f26a-b9d1-4acf-9577-9bc20b591ac4" alt="keepup" />
          <div>
          <p>Vous avez demander une rénitialisation de votre mot de passe veuillez cliquer sur ce lien pour pouvoir le changer:</p>
          <p>
            <a href="https://keepup-oclock.netlify.app/account/password/reset/${id}/${token}">
            https://keepup-oclock.netlify.app/account/password/reset/${id}/${token}
            </a>
          </p>
          <p>Si vous n'etes pas l'origine de cette demande, ignorer cet email et aucune action ne sera effectuée</p>
          <p>L'équipe Keep'up</p>
          <a href="nathanbardi.com">https://keepup.com</a>
          </div>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
