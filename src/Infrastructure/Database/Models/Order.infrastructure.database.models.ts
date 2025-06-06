import { DataTypes } from "sequelize"
import Database from "../ConnectDb.infrastructure.database";

export const OrderModel = Database.define(
 "orders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segmento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.JSON,
      allowNull: false
    },
    mensagem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    produtos: {
      type: DataTypes.JSON,
      allowNull: false
    },
    pagamento: {
      type: DataTypes.JSON,
      allowNull: false
    },
    analytics: {
      type: DataTypes.JSON,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    modelName: "orders",
    timestamps: true,
    underscored: false
  }
);
