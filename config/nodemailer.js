import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const forgetpassword = async (Name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: "lomatulmahzabin@gmail.com",
        pass:"rlce wdie csyr ofbs"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: 'lomatulmahzabin@gmail.com',
      to: email,
      subject: 'Password Reset',
      text:`Hi ${Name},Your Otp for password Update is ${token} `,
      html:`<p>Hi ${Name},</p><p>Your Otp for password Update is ${token} </p>`
    });

    console.log('Password reset email sent successfully');

  } catch (error) {
    console.log('Email not sent!');
    console.log(error);
    return error;
  }
};

export default forgetpassword;