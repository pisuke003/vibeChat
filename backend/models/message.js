const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    Read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // ✅ Add this line
);

module.exports = mongoose.model('messages', messageSchema);

