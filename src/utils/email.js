import nodemailer from 'nodemailer'

export const sendEmail = async(user, token) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:5000/reset-password/${token}`; // frontend link

    await transporter.sendMail({
      from: `"LogiRate" <${process.env.EMAIL_USER}> `,
      to: user.email,
      subject: 'Password Reset',
      html: `<h3><em>Hello, </em>You requested a password reset</h3>
             <p>Kindly, click this <a href="${resetLink}">link</a> to reset your password.</p>`
    });}