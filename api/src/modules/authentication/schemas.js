import { schemaComposer } from 'graphql-compose';

import { UserTC } from './types.js';
import { onlyAuthenticated, onlyGuest } from './middleware.js';
import { authenticate, isAuthorized, logout } from './resolvers.js';

UserTC.addResolver(authenticate);
UserTC.addResolver(isAuthorized);
UserTC.addResolver(logout);

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById', [onlyAuthenticated]),
  userByIds: UserTC.getResolver('findByIds', [onlyAuthenticated]),
  userOne: UserTC.getResolver('findOne', [onlyAuthenticated]),
  userMany: UserTC.getResolver('findMany', [onlyAuthenticated]),
  userCount: UserTC.getResolver('count', [onlyAuthenticated]),
  userConnection: UserTC.getResolver('connection', [onlyAuthenticated]),
  userPagination: UserTC.getResolver('pagination', [onlyAuthenticated]),

  userAuthorized: UserTC.getResolver('isAuthorized', [onlyAuthenticated]),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.getResolver('createOne', [onlyAuthenticated]),
  userCreateMany: UserTC.getResolver('createMany', [onlyAuthenticated]),
  userUpdateById: UserTC.getResolver('updateById', [onlyAuthenticated]),
  userUpdateOne: UserTC.getResolver('updateOne', [onlyAuthenticated]),
  userUpdateMany: UserTC.getResolver('updateMany', [onlyAuthenticated]),
  userRemoveById: UserTC.getResolver('removeById', [onlyAuthenticated]),
  userRemoveOne: UserTC.getResolver('removeOne', [onlyAuthenticated]),
  userRemoveMany: UserTC.getResolver('removeMany', [onlyAuthenticated]),

  userAuthenticate: UserTC.getResolver('authenticate', [onlyGuest]),
  userLogout: UserTC.getResolver('logout', [onlyAuthenticated]),
});

export default schemaComposer.buildSchema();
