// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
import jwt from 'jsonwebtoken';

import config from '$/setup';
import { UserModel } from './models.js';

export const expressAuthentication = async (request, response, next) => {
  try {
    const { headers: { authorization } } = request;
    if (!authorization) new Error('No authorization on request');
    if (!authorization.startsWith('bearer ')) new Error('Bearer authentication should be applied');

    const accessToken = authorization.substring(7, authorization.length);
    if (!accessToken) new Error('No access token in authorization');

    const { userId } = jwt.verify(accessToken, config.JWT_SECRET);
    const user = await UserModel.findById(userId);
    if (!user) return new Error(`No user was found with id ${userId}`);

    Object.assign(request, {
      user,
      accessToken,
    });
    return next();
  } catch (e) {
    return next();
  }
};

export const onlyAuthenticated = async (resolve, source, args, context, info) => {
  const { user } = context.request;
  if (!user) return Promise.reject(new Error('You must login to perform this operation'));
  return resolve(source, args, context, info);
};

export const onlyGuest = async (resolve, source, args, context, info) => {
  const { user } = context.request;
  if (user) return Promise.reject(new Error('This operation cannot be performed while logged in'));
  return resolve(source, args, context, info);
};
