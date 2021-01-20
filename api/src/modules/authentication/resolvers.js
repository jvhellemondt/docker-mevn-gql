import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';

import { UserModel } from './models.js';
import config from '$/setup';
import redis from '$/setup/redis';

export const authenticate = schemaComposer.createResolver({
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

export const isAuthorized = schemaComposer.createResolver({
  kind: 'query',
  name: 'isAuthorized',
  type: 'UserId!',
  resolve: async ({ context: { request } }) => {
    try {
      return {
        userId: `${request.user.id}`,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
});

export const logout = {
  kind: 'mutation',
  name: 'logout',
  type: 'Success!',
  resolve: async ({
    context: {
      request: {
        user,
        accessToken,
      },
    },
  }) => {
    try {
      await redis.set(`expiredToken:${accessToken}`, user._id, 'EX', config.REDIS_TOKEN_EXPIRY);
      return { success: true };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
