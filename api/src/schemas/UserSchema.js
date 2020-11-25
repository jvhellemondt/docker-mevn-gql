import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { onlyAuthenticatedWrapper, onlyAuthenticated } from '../middleware/authorization.js';
import { UserModel } from '../models';

const UserTC = composeWithMongoose(UserModel, {});
//
// @todo: implement login
// https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
//
schemaComposer.Query.addFields({
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

  // authenticate: UserTC.getResolver('authenticate'),
});

export default schemaComposer.buildSchema();

