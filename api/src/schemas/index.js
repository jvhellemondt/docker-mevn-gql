import { schemaComposer } from 'graphql-compose';

import PostSchema from './PostSchema'
import UserSchema from './UserSchema'

schemaComposer.merge(UserSchema);
schemaComposer.merge(PostSchema);

export default schemaComposer.buildSchema();
