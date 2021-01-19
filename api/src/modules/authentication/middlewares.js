// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
import jwt from 'jsonwebtoken';

import config from '$/setup';

export const expressAuthentication = (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader.startsWith('bearer ')) new Error('Authorization token must start with Bearer');

    const accessToken = authorizationHeader.substring(7, authorizationHeader.length);
    if (!accessToken) new Error('No access token provided');

    const decodedToken = jwt.verify(accessToken, config.JWT_SECRET);
    req.isAuthenticated = true;
    req.user = decodedToken.user;
  } catch (error) {
    req.isAuthenticated = false;
  }
  return next();
};
