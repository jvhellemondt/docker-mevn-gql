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
});

UserSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

export const UserModel = mongoose.model('User', UserSchema);
