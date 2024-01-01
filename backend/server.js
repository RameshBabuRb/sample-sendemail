
// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config()

// const app = express();
// const port = 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: 'http://example.com', // Specify the allowed origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Enable credentials (cookies, authorization headers, etc.)
//     optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors());


// app.get('/', (req, res) => {
//     res.status(200).json({ message: "connected" })
// })
// app.post('/sendmail', async (req, res) => {

//     const { email } = req.body;
//     console.log(email)
//     try {
//         // Create a transporter using your Gmail credentials
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'rameshpersonal99@gmail.com',
//                 pass: process.env.apppassword,
//             },
//         });

//         // Define the email options
//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: email,
//             subject: 'Hello from Nodemailer',
//             text: 'This is a test email sent using Nodemailer.',
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error.message);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:****.@cluster0.63q0ght.mongodb.net/crud', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  orgin:["https://ramesh-projects-frontend.vercel.app"],
  method:["POST","GET"],
  credential:true
}));

// Define a simple schema for the example
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const users = mongoose.model('users', UserSchema);

// Routes
app.get('/',(req, res) => {
   res.json("hello");
}
app.get('/users', async (req, res) => {
  try {
    const items = await users.find();
    res.json(items);
  } catch (error) {
    console.log(first)
    res.status(500).send(error.message);
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new users(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log("first",error)
    res.status(500).send(error.message);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const item = await users.findById(req.params.id);
    res.json(item);
  } catch (error) {
    console.log("first",error)
    res.status(500).send(error.message);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedItem = await users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedItem = await users.findByIdAndRemove(req.params.id);
    res.json(deletedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
