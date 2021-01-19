import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true });

UserSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

UserSchema.statics.userExists = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
