const Event = require('../models/event_model');
const path = require('path');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, description, hostName, googleFormLink } = req.body;
    let image = null;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const event = new Event({
      name,
      date,
      description,
      image,
      hostName,
      googleFormLink, // Adding the googleFormLink if provided
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get events by hostName
exports.getEventsByHostName = async (req, res) => {
  const { hostName } = req.params;
  try {
    // Find events by hostName and sort them by creation date in descending order (latest first)
    const events = await Event.find({ hostName }).sort({ createdAt: -1 }); // Assuming you have a createdAt field
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId);
    res.json({ message: `Event with ID ${eventId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};