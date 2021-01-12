import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { schemaComposer } from 'graphql-compose';

schemaComposer.createObjectTC({
  name: 'AccessToken',
  fields: { accessToken: 'String!' },
});

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

const accountSchema = new mongoose.Schema({
    verification: {
      verified: {
        type: Boolean,
        default: false,
      },
      token: String,
      expiresIn: Date,
    },
    resetPassword: {
      token: String,
      expiresIn: Date,
    },
  },
  { timestamps: true });

export const AccountModel = mongoose.model('Account', accountSchema);
