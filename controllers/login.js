const passport = require("passport");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../keys");

module.exports = (req, res, next) => {
  console.log(req.body);

  passport.authenticate("local", (err, renter) => {
    if (err) res.json({error: 'Server error'});
    if (!renter) res.status(401).json('Username or password incorrect');
    else {
      const token = jwt.sign({ id: renter._id }, privateKey, {
        algorithm: "RS256",
      });
      res.cookie("token", token);
      res.json({ token: token });
    }
  })(req, res, next);
};
