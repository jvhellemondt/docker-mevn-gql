import { schemaComposer } from 'graphql-compose';

import { onlyAuthenticated } from '~/authentication/permissions.js';
import { UserTC } from '~/authentication/types.js';
import { authenticateResolver, authorizedResolver } from '~/authentication/resolvers.js';

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById', [onlyAuthenticated]),
  userByIds: UserTC.getResolver('findByIds', [onlyAuthenticated]),
  userOne: UserTC.getResolver('findOne', [onlyAuthenticated]),
  userMany: UserTC.getResolver('findMany', [onlyAuthenticated]),
  userCount: UserTC.getResolver('count', [onlyAuthenticated]),
  userConnection: UserTC.getResolver('connection', [onlyAuthenticated]),
  userPagination: UserTC.getResolver('pagination', [onlyAuthenticated]),

  authorized: authorizedResolver,
})

schemaComposer.Mutation.addFields({
  authenticate: authenticateResolver,

  userCreateOne: UserTC.getResolver('createOne', [onlyAuthenticated]),
  userCreateMany: UserTC.getResolver('createMany', [onlyAuthenticated]),
  userUpdateById: UserTC.getResolver('updateById', [onlyAuthenticated]),
  userUpdateOne: UserTC.getResolver('updateOne', [onlyAuthenticated]),
  userUpdateMany: UserTC.getResolver('updateMany', [onlyAuthenticated]),
  userRemoveById: UserTC.getResolver('removeById', [onlyAuthenticated]),
  userRemoveOne: UserTC.getResolver('removeOne', [onlyAuthenticated]),
  userRemoveMany: UserTC.getResolver('removeMany', [onlyAuthenticated]),
})

export default schemaComposer.buildSchema();
