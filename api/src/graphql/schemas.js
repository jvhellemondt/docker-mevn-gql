import { schemaComposer } from 'graphql-compose';

import AuthenticationSchema from '~/authentication/schema';

schemaComposer.merge(AuthenticationSchema);

export default schemaComposer.buildSchema();
