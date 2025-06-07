const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
 members:{
    type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   
 },
 lastMessage: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Message'
}, 
unreddMessages: {
    type: Number,
    default: 0}
}, {
  timestamps: true
});

 module.exports=mongoose.model('Chat', chatSchema);