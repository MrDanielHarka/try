import createConnection from '../databaseConnection.js';
import {logEventToLogFile} from "../utilities.js";
import DatabaseException from "../exceptions/DatabaseException.js";

class AuthorModel {
  static async getAllAuthors() {
    let connection;
    try {
      connection = await createConnection();
      const [result] = await connection.execute('SELECT * FROM authors');
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

  static async getOneAuthor(request) {
    const id = request.url.split('/').pop();
    let connection;
    try {
      connection = await createConnection();
      const [result] = await connection.execute('SELECT * FROM authors WHERE id = ?', [id]);
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

  static async addOneAuthor(requestData) {
    let connection;
    const newAuthor = requestData;

    try {
      connection = await createConnection();
      const query = `INSERT INTO authors (name) VALUES (?)`;
      const params = [newAuthor.name];
      const [result] = await connection.execute(query, params);
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DatabaseException('Author already exists');
      }
      logEventToLogFile(error, error.message);
      throw new DatabaseException('API is under maintenance.');
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }


  static async updateOneAuthor(request, requestData) {
    const id = request.url.split('/').pop();
    let result;
    let connection;
    const updatedAuthor = requestData;

    try {
      connection = await createConnection();
      const query = `UPDATE authors SET name = ? WHERE id = ?`;
      const params = [updatedAuthor.name, id];
      [result] = await connection.execute(query, params);
    } catch (error) {
      logEventToLogFile(new DatabaseException(), `Failed to update author with id ${id}.`);
      throw new DatabaseException(`Failed to update author with id ${id}.`);
    } finally {
      if (connection) connection.end();
    }

    if (result.affectedRows === 0) {
      logEventToLogFile(new DatabaseException(), `Author with id ${id} does not exist.`);
      throw new DatabaseException(`Failed to update author. Author with id ${id} does not exist.`);
    }
    return id;
  }

  static async deleteOneAuthor(request) {
    const id = request.url.split('/').pop();
    let result;
    let connection;

    try {
      connection = await createConnection();
      [result] = await connection.execute('DELETE FROM authors WHERE id = ?', [id]);
    } catch {
      logEventToLogFile(new DatabaseException(), `Failed to delete author with id ${id}.`);
      throw new DatabaseException(`Failed to delete author with id ${id}.`);
    } finally {
      if (connection) connection.end();
    }

    if (result.affectedRows === 0) {
      logEventToLogFile(new DatabaseException(), `Author with id ${id} does not exist.`);
      throw new DatabaseException(`Failed to delete author. Author with id ${id} does not exist.`);
    }
    return id;
  }

  static async getAllBooksFromOneAuthor(request) {
    const id = request.url.split('/')[2];
    let connection;
    try {
      connection = await createConnection();
      const [result] = await connection.execute(
        'SELECT id, title, published_year FROM books WHERE author_id = ?',
        [id]
      );
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
}




export default AuthorModel;
