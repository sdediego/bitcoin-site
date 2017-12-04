const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
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

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
