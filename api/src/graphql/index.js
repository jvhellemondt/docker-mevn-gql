import { graphqlHTTP } from 'express-graphql';

import schema from './schemas';
import config from '$/config';

export default graphqlHTTP(async request => ({
  schema,
  graphiql: config.IS_DEV ? { headerEditorEnabled: true } : false,
  context: { request },
}));
