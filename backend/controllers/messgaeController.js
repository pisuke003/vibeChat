const router = require("express").Router();
const Message = require("../models/message");
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/sendmessage", authMiddleware, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        latestMessage: savedMessage._id,
        $inc: { unreadMessages: 1 }
      },
      { new: true }
    );

    res.status(200).send({
      message: "Message sent successfully",
      success: true,
      data: savedMessage,
    });

  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

router.get("/getmessages/:chatId", authMiddleware, async (req, res) => {
  try {
    const allMessages = await Message.find({ chatId: req.params.chatId }).sort({ createdAt: 1 });
    res.status(200).send({
      message: "Messages fetched successfully",
      success: true,
      data: allMessages,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;
