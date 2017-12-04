const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
    },
    content: {
      type: String,
      required: [true, 'Reply content is required.']
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
