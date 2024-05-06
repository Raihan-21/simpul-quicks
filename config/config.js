require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: process.env.DATABASE_PASSWORD_DEV,
    database: "quicks",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "postgres",
    password: process.env.DATABASE_PASSWORD_PROD,
    database: "railway",
    host: "viaduct.proxy.rlwy.net",
    port: 30062,
    dialect: "postgres",
  },
};
