import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';

class EmailManager
{
    constructor()
    {
        this.smtp_config = {
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_KEY
            },
        };
    }

    async send(from, to, subject, templateFile, context = {})
    {

        const transporter = nodemailer.createTransport(this.smtp_config);

        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template(context);

        const mailOptions = {
            from: `"From" <${from}>`,
            to:  to,
            subject: subject,
            html
        };

        await transporter.sendMail(mailOptions);
    }
}

export default EmailManager;
