import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "postgres",
  username: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  port: 5432,
  // Uncomment if you don't want to see the executed SQL requests in the logs
  // logging: false,
});

export default sequelize;
