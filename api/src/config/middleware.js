import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import graphql from '$/graphql';
import { expressAuthentication } from '~/authentication/middleware';

export default app => {
  // App middleware
  app.use(expressAuthentication);
  app.use('/graphql', graphql);

  // third-party middleware
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(cors());

}
