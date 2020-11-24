// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if(!token || token === '') {
        req.isAuthenticated = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        req.isAuthenticated = false;
        return next();
    };
    req.isAuthenticated = true;
    req.appRoles = decodedToken.appRoles;
    req.userId = decodedToken.userId;
    next();
}
