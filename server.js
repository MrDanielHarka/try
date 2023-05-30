import {createRequire} from 'module';
import BookController from './controllers/BookController.js';
import AuthorController from './controllers/AuthorController.js';
import {
  setServerConfiguration,
  checkDatabaseHealth,
  parseRequestData, logEventToLogFile,
} from './utilities.js';
import login from './loginService.js';

const require = createRequire(import.meta.url);
const http = require('http');

const server = http.createServer(async (request, response) => {
  setServerConfiguration(response);
  try {
    const isServerOnline = await checkDatabaseHealth();

    if (isServerOnline) {
      const requestData = await parseRequestData(request);
      const isAuthorized = await login(requestData);

      if (
        request.url.startsWith('/books') &&
        (request.method === 'GET' || isAuthorized)
      ) {
        await BookController.routeRequest(request, response, requestData);
      } else if (request.url.startsWith('/authors') &&
        (request.method === 'GET' || isAuthorized)) {
        await AuthorController.routeRequest(request, response, requestData);
      } else {
        response.writeHead(401);
        response.end('You are not authorized to perform this action.');
      }
    }
  } catch (error) {
    logEventToLogFile(error, error.message);
    response.writeHead(404);
    response.end(error.message);
  }
});

export {server};
