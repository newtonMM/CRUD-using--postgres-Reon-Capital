"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    // Uncomment if you don't want to see the executed SQL requests in the logs
    // logging: false,
});
exports.default = sequelize;
