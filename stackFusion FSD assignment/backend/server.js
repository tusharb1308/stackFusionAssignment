const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, dob, email, phone } = req.body;

  // Perform phone number validation
  // You can use any phone number validation library or regex pattern
  const isValidPhoneNumber = validatePhoneNumber(phone);

  if (!isValidPhoneNumber) {
    res.status(400).send('Invalid phone number.');
    return;
  }

  // Perform email validation
  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    res.status(400).send('Invalid email address.');
    return;
  }

  // Perform age validation
  const minimumAge = 18;
  const today = new Date();
  const dateOfBirth = new Date(dob);
  const age = today.getFullYear() - dateOfBirth.getFullYear();

  if (age < minimumAge) {
    res.status(400).send(`Age should be at least ${minimumAge} years.`);
    return;
  }

  // Save the form and send an email
  // Replace the following code with your own logic to save the form and send an email
  // Here, we're just printing the form details and sending a dummy email
  console.log('Form Details:');
  console.log('Name:', name);
  console.log('Date of Birth:', dob);
  console.log('Email:', email);
  console.log('Phone:', phone);

  // Configure Nodemailer to send an email
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your email provider's SMTP server
    port: 587,
    secure: false, // Set to true if using a secure connection (e.g., SMTP over SSL/TLS)
    auth: {
      user: 'bansaltushar1213@gmail.com', // Replace with your email address
      pass: '' // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'bansaltushar1213@gmail.com', // Replace with your email address
    to: email,
    subject: 'Form Submission',
    text: `Thank you for submitting the form. Your details are:\n\nName: ${name}\nDate of Birth: ${dob}\nEmail: ${email}\nPhone: ${phone}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Phone number validation function
function validatePhoneNumber(phone) {
  // Replace with your own phone number validation logic
  return /^\d{10}$/.test(phone);
}

// Email validation function
function validateEmail(email) {
  // Replace with your own email validation logic
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
