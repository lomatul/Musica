import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../dataModels/User.model.js';


export function initializepassport  (passport, getUserByEmail, getUserById)  {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'This email is not registered!' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password Incorrect!' });
        }
      });
    } catch (err) {
      console.error(err);
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log(user);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

// export default initializepassport;
