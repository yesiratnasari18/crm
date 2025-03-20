const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig'); // Ensure your dbConfig.js is properly set up
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./Routes/userRouter'); // Ensure userRouter is correctly configured

// Middleware setup
app.use(bodyParser.json());
// app.use(cors({
//     origin: "http://localhost:5175", // Allow only this origin
//     methods: ["POST", "GET"],
//     credentials: true
// }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Session setup (Ensure it comes before your route handlers)
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));

// Routes (after session setup)
app.use('/user', user);

// Server startup
const PORT = process.env.PORT // Default to port 5000 if not provided in .env
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
