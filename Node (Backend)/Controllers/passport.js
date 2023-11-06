
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require('passport');

const GOOGLE_CLIENT_ID = "139376587167-4r8rq34pu2st2pfu2ega2pjg2hs39brh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
 
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, 

  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});