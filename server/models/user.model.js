const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltWorkFactor = 10;

const userSchema = new Schema({
    username: {
      type: String,
      required: [true, 'Username field is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email field is required']
    },
    password: {
      type: String,
      required: [true, 'Password field is required']
    },
    name: {
      type: String,
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
        delete ret.password;
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

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
