// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Hello@CLT',  // Replace with your MySQL password
    database: 'beauty_salon'  // Replace with your actual database name
});



// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Import Nodemailer
const nodemailer = require('nodemailer');

// Setup the transporter (replace with your email provider details)
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email provider
    auth: {
        user: 'youremail@gmail.com',  // Your email address
        pass: 'yourpassword'          // Your email password
    }
});

// Function to send confirmation email
const sendConfirmationEmail = (toEmail) => {
    const mailOptions = {
        from: 'didymoslikassa@gmail.com',
        to: toEmail,
        subject: 'Booking Confirmation',
        text: 'Your appointment has been successfully booked!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
};

// Handle POST request to store booking data
app.post('/api/bookings', (req, res) => {
    const { name, email, phone, date, time } = req.body;

    const query = `INSERT INTO bookings (name, email, phone, date, time) VALUES (?, ?, ?, ?, ?)`;

    db.execute(query, [name, email, phone, date, time], (err, results) => {
        if (err) {
            console.error('Error inserting booking:', err);
            return res.status(500).json({ message: 'Failed to book appointment. Try again later.' });
        }
        res.status(201).json({ message: 'Booking successful!' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
