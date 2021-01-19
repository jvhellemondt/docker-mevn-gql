import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';

import { UserModel } from './models.js';
import config from '$/setup';

export const authenticateResolver = schemaComposer.createResolver({
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

      const accessToken = jwt.sign({ user: user.id },
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
  type: 'AccessToken!',
  resolve: async ({ context: { request } }) => {
    try {
      return {
        accessToken: `${request.user}`,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
});

const logout = {
  name: 'logout',
  type: 'Succeed!',
  resolve: async ({
    context: {
      user,
      accessToken,
    },
  }) => {
    try {
      await redis.set(`expiredToken:${accessToken}`, user._id, 'EX', process.env.REDIS_TOKEN_EXPIRY);

      return { succeed: true };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const verifyRequest = {
  name: 'verifyRequest',
  type: 'Succeed!',
  resolve: async ({ context: { user } }) => {
    try {
      const token = await userService.verifyRequest(user);

      userMail.verifyRequest(user, token);

      return { succeed: true };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const verify = {
  name: 'verify',
  type: 'AccessToken!',
  args: { token: 'String!' },
  resolve: async ({ args: { token } }) => {
    try {
      const user = await UserModel.findOne({
        'account.verification.token': token,
      });
      if (!user) {
        return Promise.reject(new Error('Access Token is not valid or has expired.'));
      }

      user.set({
        account: {
          verification: {
            verified: true,
            token: null,
            expiresIn: null,
          },
        },
      });

      await user.save();

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      userMail.verify(user);

      return { accessToken };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const resetPassword = {
  name: 'resetPassword',
  type: 'Succeed!',
  args: { email: 'String!' },
  resolve: async ({ args: { email } }) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return Promise.reject(new Error('User not found.'));
      }

      const token = crypto({
        length: 48,
        type: 'url-safe',
      });
      const expiresIn = moment().add(7, 'days');

      user.set({
        account: {
          resetPassword: {
            token,
            expiresIn,
          },
        },
      });

      await user.save();

      userMail.resetPassword(user, token);

      return { succeed: true };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const newPassword = {
  name: 'newPassword',
  type: 'AccessToken!',
  args: {
    token: 'String!',
    newPassword: 'String!',
  },
  resolve: async ({
    args: {
      token,
      newPassword,
    },
  }) => {
    try {
      const user = await UserModel.findOne({
        'account.resetPassword.token': token,
      });
      if (!user) {
        return Promise.reject(new Error('Access Token is not valid or has expired.'));
      }

      const hash = bcrypt.hashSync(newPassword, 10);

      user.set({
        password: hash,
        account: {
          resetPassword: {
            token: null,
            expiresIn: null,
          },
        },
      });

      await user.save();

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return { accessToken };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const changePassword = {
  name: 'changePassword',
  type: 'Succeed!',
  args: {
    currentPassword: 'String!',
    newPassword: 'String!',
  },
  resolve: async ({
    args: {
      currentPassword,
      newPassword,
    },
    context: { user },
  }) => {
    try {
      const comparePassword = await user.comparePassword(currentPassword);
      if (!comparePassword) {
        return Promise.reject(new Error('Current password is incorrect.'));
      }

      const hash = bcrypt.hashSync(newPassword, 10);

      user.set({ password: hash });

      await user.save();

      return { succeed: true };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
