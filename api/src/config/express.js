import { EXPRESS_PORT } from './constants';

export default (app) => {
  app.use('*', (request, response) => {
    response.status(404).send('404 Not Found');
  });

  return app.listen(EXPRESS_PORT, console.warn(`🚀 The server started on port ${EXPRESS_PORT} 🔥`));
}
