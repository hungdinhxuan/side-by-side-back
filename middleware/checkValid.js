const validator = require('validator');

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (!validator.matches(username, '^[a-zA-Z0-9_.-]*$')) {
    return res
      .status(400)
      .json({ success: false, message: 'Username is not a valid' });
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  ) {
    return res
      .status(400)
      .json({ success: false, message: 'Password is too weak' });
  }
  next()
};
