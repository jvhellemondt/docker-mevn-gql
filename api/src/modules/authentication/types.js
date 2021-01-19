import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { UserModel } from './models.js';

schemaComposer.createObjectTC({
  name: 'AccessToken',
  fields: { accessToken: 'String!' },
});

schemaComposer.createObjectTC({
  name: 'UserId',
  fields: { userId: 'String!' },
});

export const UserTC = composeWithMongoose(UserModel).removeField('password');
