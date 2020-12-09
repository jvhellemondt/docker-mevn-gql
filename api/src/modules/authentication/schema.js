import { schemaComposer } from 'graphql-compose';

import { onlyAuthenticated, onlyAuthenticatedWrapper } from './middleware';
import { UserTC } from './type';
import { authenticateResolver } from './resolver';

schemaComposer.Query.addFields({
  accessToken: {
    type: 'String',
    description: 'Token of authenticated user.',
  },
  ...onlyAuthenticatedWrapper({
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
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

