require("dotenv").config();
import { Sequelize } from "sequelize";

const db: any = process.env.DB_NAME;
const username: any = process.env.DB_USER;
const password = process.env.DB_PASS;
const port: any = process.env.DB_PORT;

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port,
});

export const verifyDBConnection = async (sequelize: any) => {
  // Verify Database connection
  await sequelize
    .authenticate()
    .then(async () => {
      console.log("Database connected successfully");
    })
    .catch((e: any) => {
      console.log(e, "====> Error on db connection");
    });

  return true;
};
