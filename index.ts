import express from "express";
import routes from "./src/routes/module.routes";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerJsDocs = YAML.load("./api.yaml");
import db from "./src/database/models";
import { sequelize, verifyDBConnection } from "./src/database/dbConnection";
const app = express();
const port = process.env.PORT || 3000;

// Body-parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.get("/api/string", (req, res) =>
  res.status(200).json({ status: 200, msg: "This is string" })
);

app.use("/api", routes);

// Un-command the below function to create tables.
// db.sequelize.sync();

verifyDBConnection(sequelize).then(() => {
  app.listen(port, () => console.log(`Server listening on ${port}`));
});
