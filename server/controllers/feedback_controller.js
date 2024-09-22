const Feedback = require('../models/feedback_model');

exports.submitFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback,
        });

        await newFeedback.save();

        res.send('Feedback submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getAllFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find();
        res.json(allFeedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
      const feedbackId = req.params.id;
  
      // Check if the feedback with the given ID exists
      const existingFeedback = await Feedback.findById(feedbackId);
      if (!existingFeedback) {
        return res.status(404).json({ success: false, message: 'Feedback not found' });
      }
  
      // Delete the feedback
      await Feedback.deleteOne({ _id: feedbackId });
  
      res.json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };