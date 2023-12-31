import path from "path";
import bcrypt from "bcrypt";
import passport from "passport";
import User  from "../dataModels/User.model.js";




export const getScope = passport.authenticate("google", {
  scope: ["email", "profile"]
}
);


// export const getCallback = passport.authenticate("google", {
//   successRedirect: "/User/welcome",
//   failureRedirect: "/User/google/failure",
//   successFlash: true,
//   failureFlash: true
// });

export const getCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ error: "Authentication error" });
    }

    if (!user) {
      console.error("Authentication failed:", info.message);
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user , (err) => {
      console.log("User is set", user);
      if(err){
        console.error(err)
        return res.status(500).json({ error: "Session is not set" });
      }
      else{
        return res.status(200).json({ message: "Logged In", User: user });
      }
    }
    )
    // console.log("check", req.isAuthenticated());
    console.log("user checked", req.user);
    // console.log("if session is set", req.user)
    // Authentication succeeded
    
  })(req, res, next);
}


export const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ error: "Authentication error" });
    }

    if (!user) {
      console.error("Authentication failed:", info.message);
      return res.status(401).json({ error: info.message });
    }
    user.password = undefined;
    req.logIn(user , (err) => {
      console.log("User is set", user);
      if(err){
        console.error(err)
        return res.status(500).json({ error: "Session is not set" });
      }
      else{
        res.status(200).json({ message: "Logged In", User: user });
      }
    }
    )
    console.log("user checked", req.user);
    
    
  })(req, res, next);
};











export const postRegister = async (req, res, next) => {
const {  email, password } = req.body;
const name= req.body.username
  console.log(name)
  console.log(email)
  console.log(password)

const errors=[]
if (!name || !email || !password ) {
  errors.push("All fields are required!");
}

if (errors.length > 0) {
  res.status(400).json({ error: errors });
} else {
  //Create New User
  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push("User already exists with this email!");
      res.status(400).json({ error: errors });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          errors.push(err);
          res.status(400).json({ error: errors });
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              errors.push(err);
              res.status(400).json({ error: errors });
            } else {
              const newUser = new User({
                name,
                email,
                password: hash,
              });
              newUser
                .save()
                .then(() => {
                  res.status(200).json({message:"Welcome to Musica" });
                })
                .catch(() => {
                  errors.push("Please try again");
                  res.status(400).json({ error: errors });
                });
            }
          });
        }
      });
    }
  });
}
};



export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({ error: err });
    } else res.status(200).json({ message: "Logged out" });
  });
};



export const getProfileInfos = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    console.log(newPassword)
    
    const userId = req.user.id
    const user = await User.findById(userId);
    console.log(user)

    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: 'User information updated successfully' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};



export const deleteProfile = async (req, res) => {
  try {
    const profileID = req.params.id;
    const profileInfo = await User.findById(profileID);

    if (!profileInfo) {
      return res.status(404).json({ error: "Profile information not found" });
    }

    await profileInfo.deleteOne({ _id: profileID });

    res.json({ message: "Profile information deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





