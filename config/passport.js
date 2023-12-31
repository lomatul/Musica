import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../dataModels/User.model.js';


export function initializepassport  (passport, getUserByEmail, getUserById)  {
  const googleStrategy = new GoogleStrategy(
    {
      clientID : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Ensure you're accessing the email correctly from the profile
        let _email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
  
        if (!_email) {
          // Handle case where email is not available in the profile
          return done(new Error('Email not found in the Google profile.'));
        }
  
        let user = await User.findOne({ email: _email });
  
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: _email,
          });
          console.log("Google", user);
          await user.save();
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  
  );
  
  passport.use('google', googleStrategy);




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
