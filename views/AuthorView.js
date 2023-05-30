class AuthorView {

  static sendAllBooksFromOneAuthor(allBooksFromOneAuthor, response) {
    const allBooksFromOneAuthorJSON = JSON.stringify(allBooksFromOneAuthor);
    response.writeHead(200);
    response.end(allBooksFromOneAuthorJSON);
  }
  static sendAllAuthors(allAuthors, response) {
    const allAuthorsJSON = JSON.stringify(allAuthors);
    response.writeHead(200);
    response.end(allAuthorsJSON);
  }

  static sendOneAuthor(oneAuthor, response) {
    if (oneAuthor) {
      const oneAuthorJSON = JSON.stringify(oneAuthor);
      response.writeHead(200);
      response.end(oneAuthorJSON);
    } else {
      response.writeHead(404);
      response.end('No such author.');
    }
  }

  static sendCreatedAuthorId(id, response) {
    response.writeHead(201);
    response.end(
      JSON.stringify({
        message: 'Author added successfully.',
        authorId: id,
      })
    );
  }

  static sendEditedAuthorId(id, response) {
    response.writeHead(200);
    response.end(
      JSON.stringify({
        message: 'Author updated successfully.',
        authorId: id,
      })
    );
  }

  static sendDeletedAuthorId(id, response) {
    response.writeHead(200);
    response.end(
      JSON.stringify({
        message: 'Author deleted successfully.',
        authorId: id,
      })
    );
  }
}

export default AuthorView;
