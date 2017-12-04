const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    title: {
      type: String,
      required: [true, 'Thread title is required.']
    },
    content: {
      type: String,
      required: [true, 'Thread content is required.']
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

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
