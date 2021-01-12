import { schemaComposer } from 'graphql-compose';

import { onlyAuthenticated, onlyAuthenticatedWrapper } from '~/authentication/middlewares.js';
import { UserTC } from '~/authentication/types.js';
import { authenticateResolver, authorizedResolver } from '~/authentication/resolvers.js';

schemaComposer.Query.addFields({
  userMany: UserTC.getResolver('findMany'),

  ...onlyAuthenticatedWrapper({
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),

    authorized: authorizedResolver,
  }),
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

  authenticate: authenticateResolver,
});

export default schemaComposer.buildSchema();
