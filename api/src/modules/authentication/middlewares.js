// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
import jwt from 'jsonwebtoken';

import config from '$/setup';

export const expressAuthentication = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader.startsWith('bearer ')) {
    req.isAuthenticated = false;
    return next();
  }

  const accessToken = authorizationHeader.substring(7, authorizationHeader.length);
  if (!accessToken) {
    req.isAuthenticated = false;
    return next();
  }

  try {
    const decodedToken = jwt.verify(accessToken, config.JWT_SECRET);
    req.user = decodedToken.user;
    req.isAuthenticated = true;
    return next();
  } catch (e) {
    req.isAuthenticated = false;
    return next();
  }
};

export const onlyAuthenticated = async (resolve, source, args, context, info) => {
  if (context.request.isAuthenticated) return resolve(source, args, context, info);
  throw new Error('You must login to view this.');
};

export const onlyGuest = async (resolve, source, args, context, info) => {
  if (!context.request.isAuthenticated) return resolve(source, args, context, info);
  throw new Error('This action cannot be performed while logged in.');
};
