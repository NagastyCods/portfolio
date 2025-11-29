const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer")
require("dotenv").config();
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

// serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Gmail transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD

    }
});

// Handles form submission
app.post("/send-message", async(req, res) =>{
    const {name,email,message} = req.body;

    try{
        // email to admin
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL,
            subject: "New contact message",
            text: `Name: ${name} \nEmail: ${email}\nmessage: ${message}`
        });

        // email to user
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Thank you for contacting me",
            text: `Dear ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\n ${process.env.NAME}\n${process.env.TITLE}`

        })

        res.send("message sent successfully!");
    } catch(err){
        console.error(err)
        res.status(500).send("Failed tp send message")
    };
    
});

// run server
app.listen(3000, ()=> console.log("server is running on port 3000"));