const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const eventController = require('../controllers/event_controller');
const adminVerify = require('../middlewares/adminauth');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../uploads/')); // Use absolute path for 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Set up multer with file filter for images
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Error: Images Only!')); // Return an error object
    }
  },
});

// Define routes for event management
router.post('/add/events', adminVerify, upload.single('image'), eventController.createEvent);
router.get('/get/events/:hostName', eventController.getEventsByHostName);
router.get('/getAllEvents', eventController.getAllEvents);
router.delete('/remove/:eventId', eventController.deleteEvent);

module.exports = router;
