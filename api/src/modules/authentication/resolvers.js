import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';

import { UserModel } from './models.js';
import config from '$/setup';

export const authenticateResolver = schemaComposer.createResolver({
  kind: 'mutation',
  name: 'authenticate',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: 'AccessToken!',
  async resolve({
    args: {
      username,
      password,
    },
  }) {
    try {
      const user = await UserModel.userExists(username);
      if (!user) return Promise.reject(new Error('Credentials are incorrect'));

      const isEqual = await user.comparePassword(password);
      if (!isEqual) return Promise.reject(new Error('Credentials are incorrect.'));

      const accessToken = jwt.sign({ userId: user.id },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRATION },
      );
      return { accessToken };
    } catch (error) {
      return Promise.reject(error);
    }
  },
});

export const authorizedResolver = schemaComposer.createResolver({
  kind: 'query',
  name: 'authorize',
  type: 'UserId!',
  resolve: async ({ context: { request } }) => {
    try {
      return {
        userId: `${request.user}`,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
});
