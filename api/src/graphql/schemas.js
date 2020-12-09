import { schemaComposer } from 'graphql-compose';

import AuthenticationSchema from '~/authentication/schemas';

schemaComposer.merge(AuthenticationSchema);

export default schemaComposer.buildSchema();
