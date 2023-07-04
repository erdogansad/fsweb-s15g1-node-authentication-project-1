const { usernameBostami, usernameVarmi, sifreGecerlimi, usernameGecerlimi } = require("./auth-middleware.js");
const db = require("../../data/db-config.js");
const exrpess = require("express");
const router = exrpess.Router();
const bcrypt = require("bcryptjs");

router.post("/register", usernameGecerlimi, usernameBostami, sifreGecerlimi, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 8);
    const user = await db("users").insert({ username, password: hash });
    res.status(201).json({ user_id: user[0], username });
  } catch (e) {
    next(e);
  }
});

router.post("/login", usernameVarmi, sifreGecerlimi, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userInfo = await db("users").where({ username }).first();
    const parolaDogruMu = await bcrypt.compare(password, userInfo.password);

    if (userInfo && parolaDogruMu) {
      req.session.user = userInfo;
      res.status(200).json({ message: `Hoşgeldin ${userInfo.username}!` });
    } else {
      next({ status: 401, message: "Geçersiz kriter!" });
    }
  } catch (e) {
    next(e);
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ message: "Çıkış yapildi" });
      }
    });
  } else {
    res.status(200).json({ message: "Oturum bulunamadı!" });
  }
});

module.exports = router;
