import mailConfig from '@config/mail-config';
import * as nodemailer from 'nodemailer'
import { IMailProvider } from '../interface/IMailProvider';
import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailProvider implements IMailProvider {
  async sendMail(
    to: string,
    sensor: Sensor,
  ): Promise<void>{
    const subject = 'Fire Alarm';
    const message= `
      <h1>Urgente! Esse email foi enviado de um de seus sensores</h1>
      <h2>Sensor: ${sensor.name}<h2>
      <p>Descrição: ${sensor.description}</p>
      <p>Foi identificado um possivel foco de incêndio, temperatura aferida: ${sensor.temperature}°C</p>
    `;

    let mailOptions = {
        from: mailConfig.user,
        to,
        subject,
        html: message,
    };

    const transportOptions: SMTPTransport.Options = {
      host: mailConfig.host,
      port: Number(mailConfig.port),
      secure: true,
      auth: {
          user: mailConfig.user,
          pass: mailConfig.password
      },
      tls: { rejectUnauthorized: false }
    };


    const transporter = nodemailer.createTransport(transportOptions);


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
          return "E-mail enviado com sucesso!";
      }
    });
  }
}
