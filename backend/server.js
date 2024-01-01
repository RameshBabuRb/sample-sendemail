
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://example.com', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.status(200).json({ message: "connected" })
})
app.post('/sendmail', async (req, res) => {

    const { email } = req.body;
    console.log(email)
    try {
        // Create a transporter using your Gmail credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rameshpersonal99@gmail.com',
                pass: process.env.apppassword,
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Hello from Nodemailer',
            text: 'This is a test email sent using Nodemailer.',
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error.message);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
