const renters = require("../models/renters");

module.exports = (req, res, next) => {
  renters
    .findOne({
      username: req.body.username,
      password: req.body.password,
    })
    .then((renter) => {
      res.json(renter)
        ? renter
        : res.status(401).json({ error: "Username or password is incorrect" });
    })
    .catch((err) => {
      res.status(500).json(error);
    });
};
