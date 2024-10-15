import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import GoogleStrategy from "passport-google-oauth20";

import { createJWT } from "../utils/index.js";
export default function passportConfig() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.userId).populate({
          path: "businessId",
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );

  // Currently Not Used
  // Google OAuth Strategy
  const googleOpts = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  };

  passport.use(
    new GoogleStrategy(googleOpts, async (profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            role: "businessUser",
            googleId: profile.id,
            email: profile.emails[0].value,
            userName: profile.displayName,
            verified: true,
          });
        }
        const idToken = createJWT(user?._id);

        return done(null, user, { idToken });
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .exec()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
}
