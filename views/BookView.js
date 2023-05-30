class BookView {
  static sendAllBooks(allBooks, response) {
    const allBooksJSON = JSON.stringify(allBooks);
    response.writeHead(200);
    response.end(allBooksJSON);
  }

  static sendOneBook(oneBook, response) {
    if (oneBook) {
      const oneBookJSON = JSON.stringify(oneBook);
      response.writeHead(200);
      response.end(oneBookJSON);
    } else {
      response.writeHead(404);
      response.end('No such book.');
    }
  }

  static sendCreatedBookId(id, response) {
    response.writeHead(201);
    response.end(
      JSON.stringify({
        message: 'Book added successfully.',
        bookId: id,
      })
    );
  }

  static sendEditedBookId(id, response) {
    response.writeHead(200);
    response.end(
      JSON.stringify({
        message: 'Book updated successfully.',
        bookId: id,
      })
    );
  }

  static sendDeletedBookId(id, response) {
    response.writeHead(200);
    response.end(
      JSON.stringify({
        message: 'Book deleted successfully.',
        bookId: id,
      })
    );
  }

  static sendNotAuthorizedMessage(response) {
    response.writeHead(401);
    response.end(
      JSON.stringify({
        message: 'You are not authorized for this action.',
      })
    );
  }
}

export default BookView;
