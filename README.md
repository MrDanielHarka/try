# Backend Exercise

## Live demo

[daniel.harka.com/sportradar/backend-exercise](https://daniel.harka.com/sportradar/backend-exercise)

## Todo list

- [x] GET /books - Retrieve a list of all books
- [x] POST /books - Create a new book
- [x] GET /books/{id} - Retrieve the details of a specific book
- [x] PUT /books/{id} - Update the details of a specific book
- [x] DELETE /books/{id} - Delete a specific book
- [x] GET /authors - Retrieve a list of all authors
- [x] GET /authors/{id} - Retrieve the details of a specific author
- [x] PUT /authors/{id} - Update the details of a specific author
- [x] DELETE /authors/{id} - Delete a specific author
- [x] GET /authors/{author_id}/books - Give me a list of books of one author
- [x] create model for books
- [x] create model for authors
- [x] create controller for books
- [x] create controller for authors
- [x] separate server configuration from server.js
- [x] POST / books commented part BookModel line 60-76
- [x] Refactor BookModel
- [x] Refactor AuthorModel
- [x] MVC
- [x] Create proper error handling
- [x] Consistent error handling when calling the database
- [x] Create view for Author routes
- [x] POST /authors commented part
- [x] Make consistent error names
- [x] Edit database so that existing author can't be added again
- [x] Add authentication to the book routes
- [x] Refactor authentication code in BookModel
- [x] Add authentication to the author routes
- [x] SQL injection

## Questions

- [x] Should the serverConfiguration.js be a class or not?
- [x] Should the views called from the model or controller? Should the model return the value or should it call the view?
- [x] Postman buffer output?
- [x] Why is this part not executed? POST / books commented part BookModel line 60-76
- [x] Should we use static functions or instantiate the controller and view classes?
- [x] How to handle database connection errors?
- [x] Why are the next line of codes still executing after an error is thrown?
- [x] Is it ok to have sendCreatedBookId and sendEditedBookId or should we combine those two functions into one?
