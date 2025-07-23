import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const sendMail = async (to, subject, html, attachment) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: "blu",
                address: process.env.EMAIL,
            },
            to,
            subject,
            html,
            attachments: [attachment],
        });
        return info;
    } catch (error) {
        next(error);
    }
};

export { sendMail };
