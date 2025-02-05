const nodemailer = require("nodemailer") 

const mailSender = async (email, title, body) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'stephany.cormier@ethereal.email',
                pass: 'jHd6Fjc4sgUg52SkGQ'
            }
        })

        const mailOptions = {
            from: "stephany.cormier@ethereal.email",
            to: "mauryadhaval123@gmail.com",
            title: `${title}`,
            html: `${body}`,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mailSender;