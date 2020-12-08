import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

schemaComposer.createObjectTC({
  name: 'AccessToken',
  fields: {
    id: 'ID!',
    username: 'String!',
    accessToken: 'String!',
  },
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
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

UserSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

const Models = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(Models, {});

UserTC.addResolver({
  kind: 'mutation',
  name: 'authenticate',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: 'AccessToken!',
  resolve: async ({
    args,
    context,
  }) => {
    try {
      const user = await Models.findOne({ username: args.username });
      if (!user) return Promise.reject(new Error('Credentials are incorrect'));

      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) return Promise.reject(new Error('Credentials are incorrect.'));

      const accessToken = jwt.sign({ userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      return {
        id: user._id,
        username: user.username,
        accessToken,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
});

export default UserTC;
