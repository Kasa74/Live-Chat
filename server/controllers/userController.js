const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const nodemailer = require("nodemailer");
const { UPDATE } = require("sequelize/lib/query-types");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "live-live-chat-chat@mail.ru",
      pass: "iZq6MzH3xUUktbJ6kLBF",
    },
  },
  {
    from: "Mailer Test <live-live-chat-chat@mail.ru>",
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email sent: ", info);
  });
};

const generateOperatorId = () => {
  const hex = "0123456789ABCDEF";
  let operator_id = "";
  for (let i = 0; i < 16; i++) {
    operator_id += hex.charAt(Math.floor(Math.random() * 16));
  }
  return operator_id;
};

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("nekorektnie dannie"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("email already used"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const operator_id = generateOperatorId();
    const message = {
      to: req.body.email,
      subject: "Congrats! Successfully register",
      text: `http://localhost:3000/confirm/${operator_id}`,
    };

    const user = await User.create({
      email,
      role,
      password: hashPassword,
      operator_id,
    });
    mailer(message);
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async confirmOperator(req, res, next) {
    const { operator_id } = req.body;

    const user = await User.findOne({ where: { operator_id } });

    if (!user) {
      return next(ApiError.badRequest("operator ne naiden"));
    }

    user.update({ confirmed: true });

    return res.json(user);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("user ne neiden"));
    }

    if (!user.confirmed) {
      return next(ApiError.badRequest("user ne podtverzhden"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("neverniy parol"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    // return res.json({ token });
    return res.json(user);
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
