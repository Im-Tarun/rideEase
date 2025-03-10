- app.use(urlencoded({extended:true})) //to parse the data from url

- hashing password and storing it in database
```
// in user.model
userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10)
}
//in user.controller 
const hashedPassword = await userModel.hashPassword(password);

```

- using express validator 

```
//in user.route
import {body} from "express-validator"

router.post("/register",[
    body("emailId").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("first name must be atleast three character long"),
    body("password").isLength({min:6}).withMessage("password must be atleast six character long")
], userRegister)

//in user.controller
import {validationResult} from "express-validator"

export const userRegister = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
      res.status(400).json({ success: false, mesaage: errors.array() });
    }
}

```

Genrating token
```
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET)
  return token;
}

in controller
const token = newUser.generateAuthToken();
```