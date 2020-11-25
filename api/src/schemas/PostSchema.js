import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { PostModel } from '../models';

const PostTC = composeWithMongoose(PostModel, {});

schemaComposer.Query.addFields({
  postById: PostTC.getResolver('findById'),
  postByIds: PostTC.getResolver('findByIds'),
  postOne: PostTC.getResolver('findOne'),
  postMany: PostTC.getResolver('findMany'),
  postCount: PostTC.getResolver('count'),
  postConnection: PostTC.getResolver('connection'),
  postPagination: PostTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  postCreateOne: PostTC.getResolver('createOne'),
  postCreateMany: PostTC.getResolver('createMany'),
  postUpdateById: PostTC.getResolver('updateById'),
  postUpdateOne: PostTC.getResolver('updateOne'),
  postUpdateMany: PostTC.getResolver('updateMany'),
  postRemoveById: PostTC.getResolver('removeById'),
  postRemoveOne: PostTC.getResolver('removeOne'),
  postRemoveMany: PostTC.getResolver('removeMany'),
});

export default schemaComposer.buildSchema();

