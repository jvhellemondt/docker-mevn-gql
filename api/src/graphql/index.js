import { graphqlHTTP } from 'express-graphql';

import schema from './schemas';

export default graphqlHTTP(async request => ({
  schema,
  graphiql: true,
  context: { request },
}));
