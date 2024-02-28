const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors')
const app = express();
const port = 3010;

app.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nepalsecondaryschool@gmail.com',
        pass: 'divd rxpg vscc iigt',
    },
});

app.post('/api/send-email', upload.single('image'), (req, res) => {
    const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        applyForClass,
        guardianName,
        guardianContactNumber,
        subject,
        message,
    } = req.body;

    const image = req.file;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: subject,
        text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Date of Birth: ${dateOfBirth}
      Gender: ${gender}
      Apply for Class: ${applyForClass}
      Guardian Name: ${guardianName}
      Guardian Contact Number: ${guardianContactNumber}
      \nMessage:\n${message}
    `,
        attachments: [
            {
                filename: image.originalname,
                content: image.buffer,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            res.status(500).send('Error sending email');
        } else {

            res.status(200).send('Form submitted Sucessfull...');
        }
    });
});

app.get('/chandan', (req, res) => {
    res.send("server is running with chandan sharma")
})

app.get('/server',(req,res) => {
    res.send('server is connected with the api in the cloud')
})



//creating the another email sender with the email transporter in the node js


//creating the another email sender with the email transporter in the node js 
const transporterr = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nepalsecondaryschool@gmail.com',
        pass: 'divd rxpg vscc iigt',
    },
})

app.post('/api/send-contact-form', (req, res) => {
    const {
        fname,
       
        ContactNumber,
        fmessage
    } = req.body;


    const mailOptionss = {
        from: 'you-email@gmail.com',
        to: 'chandansharma575757@gmail.com',
        subject: 'new contact form',
        text: `
        Name : ${fname},
        
        Contact Number : ${ContactNumber}
        Massage : ${fmessage}
        
        `
    }


    transporterr.sendMail(mailOptionss, (error, info) => {
        if (error) {
            res.status(500).send('error sending contact form')
        } else {
            res.status(200).send("contact form submitted sucess...")
        }
    })
})





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
