import createConnection from '../databaseConnection.js';
import DatabaseException from '../exceptions/DatabaseException.js';
import {logEventToLogFile} from '../utilities.js';

class BookModel {
  static async getAllBooks() {
    let connection;
    try {
      connection = await createConnection();
      const [result] = await connection.execute('SELECT * FROM books');
      return result;
    } catch (error) {
      logEventToLogFile(error, error.message);
      throw new DatabaseException('API is under maintenance.');
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  static async getOneBook(request) {
    const id = request.url.split('/').pop();
    let connection;
    try {
      connection = await createConnection();
      const [result] = await connection.execute(
        'SELECT * FROM books WHERE id = ?',
        [id]
      );
      return result[0];
    } catch (error) {
      logEventToLogFile(error, error.message);
      throw new DatabaseException('API is under maintenance.');
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  static async addOneBook(requestData) {
    let connection;
    const newBook = requestData;

    try {
      connection = await createConnection();
      const query = `
          INSERT INTO books (title, author_id, published_year)
          VALUES (?, ?, ?)`;
      const params = [newBook.title, newBook.authorId, newBook.publishedYear];
      const [result] = await connection.execute(query, params);
      return result.insertId;
    } catch (error) {
      logEventToLogFile(error, error.message);
      throw new DatabaseException('API is under maintenance.');
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  static async updateOneBook(request, requestData) {
    const id = request.url.split('/').pop();
    let result;
    let connection;
    const updatedBook = requestData;

    try {
      connection = await createConnection();
      const query = `
          UPDATE books
          SET title          = ?,
              author_id      = ?,
              published_year = ?
          WHERE id = ?
      `;
      const params = [
        updatedBook.title,
        updatedBook.authorId,
        updatedBook.publishedYear,
        id,
      ];

      [result] = await connection.execute(query, params);
    } catch (error) {
      logEventToLogFile(
        new DatabaseException(),
        `Failed to update book with id ${id}.`
      );
      throw new DatabaseException(`Failed to update book with id ${id}.`);
    } finally {
      if (connection) connection.end();
    }

    if (result.affectedRows === 0) {
      logEventToLogFile(
        new DatabaseException(),
        `Book with id ${id} does not exist.`
      );
      throw new DatabaseException(
        `Failed to update book. Book with id ${id} does not exist.`
      );
    }
    return id;
  }

  static async deleteOneBook(request) {
    const id = request.url.split('/').pop();
    let result;
    let connection;

    try {
      connection = await createConnection();
      [result] = await connection.execute('DELETE FROM books WHERE id = ?', [
        id,
      ]);
    } catch {
      logEventToLogFile(
        new DatabaseException(),
        `Failed to delete book with id ${id}.`
      );
      throw new DatabaseException(`Failed to delete book with id ${id}.`);
    } finally {
      if (connection) connection.end();
    }

    if (result.affectedRows === 0) {
      logEventToLogFile(
        new DatabaseException(),
        `Book with id ${id} does not exist.`
      );
      throw new DatabaseException(
        `Failed to delete book. Book with id ${id} does not exist.`
      );
    }
    return id;
  }
}

export default BookModel;
