import { composeWithMongoose } from 'graphql-compose-mongoose';

import { UserModel } from './models.js';

export const UserTC = composeWithMongoose(UserModel, {});
