import { schemaComposer } from 'graphql-compose';

import { UserTC } from '~/authentication/types.js';
import { onlyAuthenticated, onlyGuest } from '~/authentication/middlewares.js';
import { authenticateResolver, authorizedResolver } from '~/authentication/resolvers.js';

UserTC.addResolver(authenticateResolver);
UserTC.addResolver(authorizedResolver);

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById', [onlyAuthenticated]),
  userByIds: UserTC.getResolver('findByIds', [onlyAuthenticated]),
  userOne: UserTC.getResolver('findOne', [onlyAuthenticated]),
  userMany: UserTC.getResolver('findMany', [onlyAuthenticated]),
  userCount: UserTC.getResolver('count', [onlyAuthenticated]),
  userConnection: UserTC.getResolver('connection', [onlyAuthenticated]),
  userPagination: UserTC.getResolver('pagination', [onlyAuthenticated]),

  userAuthorize: UserTC.getResolver('authorize', [onlyAuthenticated]),
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
});

export default schemaComposer.buildSchema();
