const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  operator_id: { type: DataTypes.STRING, unique: true },
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Messages = sequelize.define("messages", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  from_hex: { type: DataTypes.STRING, allowNull: false },
  to_hex: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  User,
  Messages,
};
