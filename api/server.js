const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const { errHandler } = require("./server-middleware");
const auth = require("./auth/auth-router.js");
const users = require("./users/users-router.js");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
  session({
    name: "cikolatacips",
    secret: "keep it secret, keep it safe!",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});
server.use("/api/auth", auth);
server.use("/api/users", users);

server.use(errHandler);

module.exports = server;
