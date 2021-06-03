const Renter = require("../models/Renter");

class RenterController {
  async get(req, res) {
    const page = req.query.page;

    if (page) {
      let skip = (page - 1) * PAGE_SIZE;
      try {
        let renter = await Renter.find({}).skip(skip).limit(PAGE_SIZE);
        return res.json(renter);
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    }
  }
  async post(req, res) {
    const { username, email, password, name, gender } = req.body;
    try {
      let renter = await Renter.findOne({ username });
      if (renter) {
        return res.status(406).json({
          success: false,
          message: "Username is already existed",
        });
      }
      renter = await Renter.findOne({ email });
      console.log(renter);
      if (renter) {
        return res
          .status(406)
          .json({ success: false, message: "Email is already existed" });
      }
      let newRenter = await Renter.create({
        username,
        email,
        password,
        name,
        gender,
      });
      return res
        .status(201)
        .json({ success: true, message: "Sign up successful !" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  update(req, res, next) {}
  delete(req, res, next) {
    Renter.deleteOne({ _id: req.id })
      .then((renter) => {
        res.json({ success: `Deleted ${renter}` });
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
  async destroy(req, res) {
    try {
      const renter = await Renter.remove({});
      return res.json({ success: true, message: "Removed Renter table" });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error,
        });
    }
  }
}

module.exports = new RenterController();
