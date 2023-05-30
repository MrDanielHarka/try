import createConnection from './databaseConnection.js';
import { createRequire } from 'module';
import DatabaseException from './exceptions/DatabaseException.js';

const require = createRequire(import.meta.url);

const setServerConfiguration = (response) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json'
  };

  Object.entries(headers).forEach(([key, value]) => {
    response.setHeader(key, value);
  });
};

const checkDatabaseHealth = async () => {
  try {
    const connection = await createConnection();
    await connection.end();
    return true;
  } catch (error) {
    throw new DatabaseException('API is under maintenance.');
  }
};

const logEventToLogFile = (error, message) => {
  const fs = require('fs');
  const date = new Date();
  date.setHours(date.getHours() + 2);
  const logLine = `${date
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')} - ${message}\n`;

  fs.appendFile('./logs.txt', logLine, error => {});
};

const parseRequestData = async request => {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', chunk => {
      body += chunk.toString();
    });

    request.on('end', () => {
      const params = new URLSearchParams(body);
      resolve(Object.fromEntries(params));
    });

    request.on('error', error => {
      reject(error);
    });
  });
};

export {
  setServerConfiguration,
  checkDatabaseHealth,
  logEventToLogFile,
  parseRequestData,
};
