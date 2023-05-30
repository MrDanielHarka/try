import AuthorModel from '../models/AuthorModel.js';
import authorView from "../views/AuthorView.js";
import AuthorView from "../views/AuthorView.js";
import DatabaseException from "../exceptions/DatabaseException.js";
import {logEventToLogFile} from "../utilities.js";

class AuthorController {
  static async routeRequest(request, response, requestData) {
    try {
      if (
        request.method === 'GET' &&
        request.url.startsWith('/authors/') &&
        request.url.endsWith('/books')
      ) {
        const allBooksFromOneAuthor = await AuthorModel.getAllBooksFromOneAuthor(request);
        authorView.sendAllBooksFromOneAuthor(allBooksFromOneAuthor, response)
      } else if (request.method === 'GET' && request.url === '/authors') {
        const allAuthors = await AuthorModel.getAllAuthors(response);
        AuthorView.sendAllAuthors(allAuthors, response);
      } else if (
        request.method === 'GET' &&
        request.url.startsWith('/authors/')
      ) {
        const oneAuthor = await AuthorModel.getOneAuthor(request, response);
        AuthorView.sendOneAuthor(oneAuthor, response);
      } else if (request.method === 'POST' && request.url === '/authors') {
        const createdAuthorId = await AuthorModel.addOneAuthor(requestData);
        AuthorView.sendCreatedAuthorId(createdAuthorId, response);
      } else if (
        request.method === 'PUT' &&
        request.url.startsWith('/authors/')
      ) {
        const editedAuthorId = await AuthorModel.updateOneAuthor(request, requestData);
        AuthorView.sendEditedAuthorId(editedAuthorId, response);
      } else if (
        request.method === 'DELETE' &&
        request.url.startsWith('/authors/')
      ) {
        const deletedAuthorId = await AuthorModel.deleteOneAuthor(request, response);
        AuthorView.sendDeletedAuthorId(deletedAuthorId, response);
      } else {
        logEventToLogFile('' , 'Something unexpected happened in the BookController.')
      }
    } catch (error) {
      logEventToLogFile(error, error.message);
      throw new DatabaseException(error.message);
    }
  }
}

export default AuthorController;
