import { schemaComposer } from 'graphql-compose';

import './types.js';

import AuthenticationSchema from '~/authentication/schemas';

schemaComposer.merge(AuthenticationSchema);

export default schemaComposer.buildSchema();
