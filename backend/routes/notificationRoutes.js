const express = require('express');
const Notification = require('../models/notificationModel');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:utilisateur_id', verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.findByUserId(req.params.utilisateur_id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;