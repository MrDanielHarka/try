import {server} from './server.js';

server.listen(3000, error => {
  if (error) return logEventToLogFile(error, error.message);
});
