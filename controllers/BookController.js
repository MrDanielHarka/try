import BookModel from '../models/BookModel.js';
import BookView from '../views/BookView.js';
import {logEventToLogFile} from '../utilities.js';
import DatabaseException from '../exceptions/DatabaseException.js';

class BookController {
  static async routeRequest(request, response, requestData) {
    try {
      if (request.method === 'GET' && request.url === '/books') {
        const allBooks = await BookModel.getAllBooks();
        if (allBooks) {
          BookView.sendAllBooks(allBooks, response);
        } else {
          response.writeHead(500);
          response.end(JSON.stringify({message: 'Server error.'}));
        }
      } else if (
        request.method === 'GET' &&
        request.url.startsWith('/books/')
      ) {
        const oneBook = await BookModel.getOneBook(request);
        BookView.sendOneBook(oneBook, response);
      } else if (request.method === 'POST' && request.url === '/books') {
        const createdBookId = await BookModel.addOneBook(requestData);
        BookView.sendCreatedBookId(createdBookId, response);
      } else if (
        request.method === 'PUT' &&
        request.url.startsWith('/books/')
      ) {
        const editedBookId = await BookModel.updateOneBook(request, requestData);
        BookView.sendEditedBookId(editedBookId, response);
      } else if (
        request.method === 'DELETE' &&
        request.url.startsWith('/books/')
      ) {
        const deletedBookId = await BookModel.deleteOneBook(request);
        BookView.sendDeletedBookId(deletedBookId, response);
      } else {
        logEventToLogFile('' , 'Something unexpected happened in the BookController.')
      }
    } catch (error) {
      logEventToLogFile(error, error.message);
      throw new DatabaseException(error.message);
    }
  }
}

export default BookController;
