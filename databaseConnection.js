import mysql from 'mysql2/promise';
import {config} from 'dotenv';
import {logEventToLogFile} from "./utilities.js";
import DatabaseException from "./exceptions/DatabaseException.js";

config();

const createConnection = async () => {
  try {
    return await mysql.createConnection(process.env.DATABASE_URL_LOCAL);
  } catch (error) {
    logEventToLogFile(error, 'Cannot connect to database.')
    throw new DatabaseException();
  }
};


export default createConnection;