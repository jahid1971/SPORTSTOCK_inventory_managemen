import nodemailer from "nodemailer";
import config from "../config";

const emailSender = async (email: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `Sports Stock ${process.env.APP_EMAIL} `, // sender address
        to: email, // list of receivers
        subject: "Reset Password Link",
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
};

export default emailSender;
