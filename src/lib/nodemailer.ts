import nodemailer from 'nodemailer'
// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ou autre service
  auth: {
    user: 'ulearning229@gmail.com',
    pass: 'ulear229@'
  }
});

async function sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
  const mailOptions = {
    from: '"ULearning" <ulearning229@gmail.com>',
    to,
    subject,
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
}
export default sendEmail;

