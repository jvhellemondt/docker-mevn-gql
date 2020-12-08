import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { schemaComposer } from 'graphql-compose';

import { UserModel } from './model';
import config from '$/config';

export const authenticateResolver = schemaComposer.createResolver({
  kind: 'mutation',
  name: 'authenticate',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: 'AccessToken!',
  resolve: async ({
    source,
    args,
    context,
    info,
  }) => {
    try {
      const user = await UserModel.findOne({ username: args.username });
      if (!user) return Promise.reject(new Error('Credentials are incorrect'));

      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) return Promise.reject(new Error('Credentials are incorrect.'));

      const accessToken = jwt.sign({ userId: user.id },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRATION },
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
