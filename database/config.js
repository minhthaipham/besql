const mssql = require("mssql");
const SQL_DRIVER = "SQL Server";
const SQL_SERVER = "DESKTOP-MSPCRA5";
const SQL_DATABASE = "Car";
const SQL_USER = "sa";
const SQL_PASSWORD = "123";
const config = {
  driver: SQL_DRIVER,
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 10,
    idleTimeoutMillis: 30000,
  },
};

const poolPromise = new mssql.ConnectionPool(config);

module.exports = {
  poolPromise,
};
