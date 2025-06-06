import dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";

dotenv.config();

const Database = new Sequelize(
  process.env.MARIADB_DATABASE as string,
  process.env.MARIADB_USER as string,
  process.env.MARIADB_PASSWORD as string,
  {
    timezone: "-03:00",
    dialect: process.env.MARIADB_DIALECT as Dialect,
    host: process.env.MARIADB_HOST as string,
    port: Number(process.env.MARIADB_PORT as string)
  }
)

export const ConnectDatabase = async () => {
  try {
    await Database.authenticate();
  } catch {
    console.error("Houve um erro ao conectar com o banco de dados, por favor, tente novamente.");
  }
}

Object.assign(Database, { ConnectDatabase });

export default Database;
