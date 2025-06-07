const router = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/createchat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    await savedChat.populate('members');
    res.status(201).send({
      message: 'Chat created successfully',
      success: true,
      data: savedChat
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

router.get("/getallchats", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const allChats = await Chat.find({ members: { $in: [userId] } })
      .populate('members')
      .sort({ updatedAt: -1 });

    res.status(200).send({
      message: 'Chats fetched successfully',
      success: true,
      data: allChats
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;
