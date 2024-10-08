import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { Logger } from '@infrastructure/logger/logger';

@injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER, // sender address
        to, // recipient(s)
        subject, // Subject line
        text, // plain text body
        html, // html body if available
      };

      const info = await this.transporter.sendMail(mailOptions);
      Logger.info(`Email sent: ${info.messageId}`);
    } catch (error) {
      Logger.error('Failed to send email', error);
      throw new Error('Error sending email');
    }
  }
}
