const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const server = http.createServer(app);

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'));

// CORS configuration
const corsOptions = {
    origin: '*', // Allow requests from all origins
    credentials: true, // Allow credentials
    optionsSuccessStatus: 200 // For legacy browsers
};
app.use(cors(corsOptions));

// Routes
const eventRoutes = require('./routes/event_route');
app.use('/api', eventRoutes);

const feedbackRoutes = require('./routes/feedback_route');
app.use('/event_api/feedback', feedbackRoutes);

const adminRoutes = require('./routes/adminAuthRoute');
app.use('/auth', adminRoutes);

// Serve static files from 'uploads' directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB setup
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });