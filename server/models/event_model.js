const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String },
  hostName: { type: String, required: true },
  googleFormLink: { type: String, default: null }, // Optional link
  linkStatus: { type: Boolean, default: false }, // Status of the link
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date when the event is created
  }
});

// Pre-save hook to set the linkStatus based on googleFormLink
eventSchema.pre('save', function (next) {
  // If googleFormLink is provided, set linkStatus to true, otherwise false
  this.linkStatus = !!this.googleFormLink;
  next();
});

module.exports = mongoose.model('Event', eventSchema);
