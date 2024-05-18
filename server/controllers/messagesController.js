const uuid = require("uuid");
const path = require("path");
const { Messages } = require("../models/models");
const apiError = require("../error/apiError");
const { Sequelize } = require("sequelize");

class MessagesController {
  async getUsersMessages(req, res, next) {
    try {
      const { users_hex } = req.body;
      const user_1 = users_hex[0];
      const user_2 = users_hex[1];

      let messages = await Messages.findAll({
        where: Sequelize.and(
          Sequelize.or(
            { from_hex: user_1, to_hex: user_2 },
            { from_hex: user_2, to_hex: user_1 }
          )
        ),
      });

      return res.json(messages);
    } catch (e) {
      console.log(e);
      next(apiError.badRequest(e.message));
    }
  }

  async addUserMessage(req, res, next) {
    try {
      const { from_hex, to_hex, message } = req.body;

      const resMessage = await Messages.create({ from_hex, to_hex, message });
      return res.json(resMessage);
    } catch (e) {
      console.log(e);
      next(apiError.badRequest(e.message));
    }
  }

  async getUserDialogs(req, res, next) {
    try {
      const { user_hex } = req.body;
      let dialogs = await Messages.findAll({
        where: {
          to_hex: user_hex,
        },
        attributes: [[Sequelize.fn("max", Sequelize.col("id")), "id"]],
        group: ["from_hex"],
      }).then((rowIds) => {
        return Messages.findAll({
          where: {
            id: rowIds.map((row) => row.id),
          },
          order: [["createdAt", "DESC"]],
        });
      });
      return res.json(dialogs);
    } catch (e) {
      console.log(e);
      next(apiError.badRequest(e.message));
    }
  }
}

module.exports = new MessagesController();
