import dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";

dotenv.config();

const Database = new Sequelize(
  process.env.APPLICATION_DB_INTEGRATION as string,
  {
    dialect: process.env.APPLICATION_DB_INTEGRATION_DIALECT as Dialect,
    dialectOptions: {
      useUTC: false,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)

export const ConnectDatabase = async () => {
  try {
    await Database.authenticate();
    // await Database.sync({ force: true }); // caso queira deletar todos os dados do banco de dados
  } catch {
    console.error("Houve um erro ao conectar com o banco de dados, por favor, tente novamente.");
  }
}

Object.assign(Database, { ConnectDatabase });

export default Database;
