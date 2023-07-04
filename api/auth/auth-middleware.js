const db = require("../../data/db-config.js");
function sinirli(req, res, next) {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      next({ status: 401, message: "Geçemezsiniz!" });
    }
  } catch (err) {
    next(err);
  }
}

async function usernameBostami(req, res, next) {
  try {
    const { username } = req.body;
    const user = await db("users").where({ username }).first();
    if (user) {
      next({ status: 422, message: "Username kullaniliyor" });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
}

async function usernameVarmi(req, res, next) {
  try {
    const { username } = req.body;
    const user = await db("users").where({ username }).first();
    if (user) {
      next();
    } else {
      next({ status: 401, message: "Geçersiz kriter" });
    }
  } catch (e) {
    next(e);
  }
}

function sifreGecerlimi(req, res, next) {
  const { password } = req.body;
  if (!password || password.length < 3) {
    next({ status: 422, message: "Şifre 3 karakterden fazla olmalı" });
  } else {
    next();
  }
}

function usernameGecerlimi(req, res, next) {
  const { username } = req.body;
  if (!username) {
    next({ status: 422, message: "Kullanıcı adı girmelisiniz" });
  } else {
    next();
  }
}

module.exports = { sinirli, usernameBostami, usernameVarmi, sifreGecerlimi, usernameGecerlimi };
