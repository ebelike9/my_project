import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    text: {
      type: String,
    },
    status: {
      type: String,
      default: 'unread',
    },
  },
  {
    timestamps: true,
  });

  const Message = mongoose.model('Message', messageSchema);
  export default Message;