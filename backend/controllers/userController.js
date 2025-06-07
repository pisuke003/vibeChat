const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/userdetail', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('+password');
    res.send({
      message: 'User fetched successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.get('/allUsers', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const allUsers = await User.find({ _id: { $ne: userId } });
    res.send({
      message: 'All users fetched successfully',
      success: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
