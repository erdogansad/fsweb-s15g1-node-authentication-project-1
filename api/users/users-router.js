const router = require("express").Router();
const { sinirli } = require("../auth/auth-middleware");
const { bul } = require("./users-model");

router.get("/", sinirli, async (req, res, next) => {
  try {
    const users = await bul();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
