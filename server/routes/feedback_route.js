
const express = require('express');
const feedbackController = require('../controllers/feedback_controller');

const router = express.Router();

router.post('/submit-feedback', feedbackController.submitFeedback);
router.get('/get-feedbacks', feedbackController.getAllFeedbacks);
router.delete('/delete-feedback/:id', feedbackController.deleteFeedback);
module.exports = router;
