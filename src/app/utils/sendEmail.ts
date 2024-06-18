import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user, // generated ethereal user
      pass: config.email_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_user, // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
