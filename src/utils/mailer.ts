import nodemailer from 'nodemailer'
import { EventEmitter } from 'events';

export const eventBus = new EventEmitter();

eventBus.on("email-url", async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Bakcend" <${process.env.EMAIL_User}>`,
        to: data.to,
        subject: 'Account created',
        text: data.text,
    })


})

