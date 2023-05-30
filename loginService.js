import {logEventToLogFile} from './utilities.js';
import DatabaseException from './exceptions/DatabaseException.js';
import createConnection from './databaseConnection.js';

const login = async userData => {
  let connection;
  try {
    let isAuthenticated = false;
    if (userData.username && userData.password) {
      connection = await createConnection();
      const query =
        'SELECT COUNT(*) AS count FROM users WHERE BINARY username = ? AND BINARY password = ?';
      const userParameters = [userData.username, userData.password];

      const [result] = await connection.execute(query, userParameters);
      isAuthenticated = result[0].count > 0;
      return isAuthenticated;
    } else {
      return isAuthenticated;
    }
  } catch (error) {
    logEventToLogFile(error, error.message);
    throw new DatabaseException('API is under maintenance.');
  } finally {
    if (connection) connection.end();
  }
};

export default login;
