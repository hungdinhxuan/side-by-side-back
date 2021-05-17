const Renter = require("../models/Renter");
const sendMail = require("../controllers/sendMail")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const { username, email, password, name } = req.body;
  console.log(req.body)
  try {
    let renter = await Renter.findOne({ username });
    if (renter) {
      return res.json({
        success: false,
        message: "Username is already existed",
      });
    }
    renter = await Renter.findOne({ email });
    console.log(renter)
    if (renter) {
      return res.json({ success: false, message: "Email is already existed" });
    }
    
    let newRenter = await Renter.create({ username, email, password, name })

    const token = jwt.sign({email}, process.env.JWT_ACTIVATE, {expiresIn: '20m'})
    const htmlContent = `
    <h2> This email is serve for activate account </h2>
    <a src="http://localhost:5000/auth/activate/${token}"> Please click the link to activate account</a>                    
    `
    const response = await sendMail(email, 'Account Activation Link', htmlContent)
    return res.status(201).json({ success: true, message: 'Sign up successful !'})

  } catch (error) {
      res.status(500).json({success: false, message: 'In Server Error'})
  }
};

exports.activateAccount =  (req, res) => {
    const {token} = req.body
    if(token){  
        jwt.verify(token, process.env.JWT_ACTIVATE, async (err, decoded) => {
            if(err){
                return res.status(400).json({success: false, message: 'Token is not valid or expired'})
            }
            const {email} = decoded
            try {
                const renter = await Renter.findOne({email})
                if(renter){
                    
                }
            } catch (error) {
                return res.status(500).json({success: false, message: 'Internal server error'})
            }
            
        })
    }else{
        return res.status(403).json({success: false, message:'Token is not provide'})
    }
 };


 
