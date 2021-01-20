import { schemaComposer } from 'graphql-compose';

schemaComposer.createObjectTC({
  name: 'Success',
  fields: { success: 'Boolean!' },
});
