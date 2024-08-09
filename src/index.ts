import express from "express";
import { initPlanetModel } from "./models/planet";
import sequelize from "./config/sequelize";
import planetRoutes from "./routes/planet";
import bodyParser from "body-parser";

console.log("Starting application");
const app = express();
initPlanetModel(sequelize);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(planetRoutes);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const shutdown = async () => {
  server.close();
  await sequelize.close();
};

process.once("SIGTERM", async function () {
  console.log("Stopping application");
  await shutdown();
  process.exit();
});
