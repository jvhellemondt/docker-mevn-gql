import { composeWithMongoose } from 'graphql-compose-mongoose';

import { UserModel } from './model';

export const UserTC = composeWithMongoose(UserModel, {});

