import { EXPRESS_PORT } from './constants';

export default (app) => app.listen(EXPRESS_PORT, console.warn(`🚀 The server started on port ${EXPRESS_PORT} 🔥`))
