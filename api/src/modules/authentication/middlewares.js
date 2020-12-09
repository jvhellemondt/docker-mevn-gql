// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
import jwt from 'jsonwebtoken';

import config from '$/config';

export const onlyAuthenticated = async (resolve, source, args, context, info) => {
  if (context.request.isAuthenticated) return resolve(source, args, context, info);
  throw new Error('You must be authorized');
};

export const onlyAuthenticatedWrapper = (resolvers) => {
  Object.keys(resolvers).forEach(key => {
    resolvers[key] = resolvers[key].wrapResolve(next => async response => {
      if (response.context.request.isAuthenticated) return next(response);
      throw new Error('You must login to view this.');
    });
  });
  return resolvers;
};

export const expressAuthentication = (req, res, next) => {
  const accessToken = req.headers['x-auth-access-token'];
  if (!accessToken || accessToken === '') {
    req.isAuthenticated = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, config.JWT_SECRET);
  } catch (err) {
    req.isAuthenticated = false;
    return next();
  }
  req.isAuthenticated = true;
  req.userId = decodedToken.user;
  return next();
};
