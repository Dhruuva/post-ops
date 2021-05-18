const JwtStrategy = require("passport-jwt").Strategy;

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const GithubStrategy = require('passport-github').Strategy;
//const MailruStrategy = require('passport-mail');
const MailruStrategy = require('passport-mailru-email').Strategy;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
//console.log( process.env.JWT_SECRET)

const User = require("../users/models/User");
const UsersController = require("../users/controllers/users.controller");

module.exports = passport => {
  // Local Strategy
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

   // Mailru Strategy
  passport.use(
    new MailruStrategy(
      {
        clientID: process.env.MAILRU_CLIENTID,
        clientSecret: process.env.MAILRU_SECRET,
        state: 'blabla',
        callbackURL:  "/api/auth/mailru/callback",
        scope: ['user:email']
      },
      function(token, tokenSecret, profile, done) {
        // we retrieve the data we need from google
        //console.log(" mail  -->",profile)
        profile_json = profile._json;
       
        // We use the loginOAuth defined in the controller of the users
        UsersController.loginOAuth(
          profile.emails[0].value,
          profile_json.first_name,
          profile_json.last_name,
          "mailru",
          profile_json.id,
          profile.photos[0].value,
          function(user) {
            return done(null, user);
          },
          function(err) {
            console.log(err);
            return done(null, false);
          }
        );
      }
    )
  );


   // Git Strategy
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL:  "/api/auth/github/callback",
        scope: ['user:email']
      },
      function(token, tokenSecret, profile, done) {
        // we retrieve the data we need from google
       // console.log(" git -->",profile)
        profile_json = profile._json;
        let fnm = (profile.displayName.split(" ").length>1)?profile.displayName.split(" ")[1]:profile.displayName
        // We use the loginOAuth defined in the controller of the users
        UsersController.loginOAuth(
          profile.emails[0].value,
          profile.username,
          fnm,
          "github",
          profile.id,
          profile.photos[0].value,
          function(user) {
            return done(null, user);
          },
          function(err) {
            console.log(err);
            return done(null, false);
          }
        );
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
        // we retrieve the data we need from google
        profile_json = profile._json;
        // We use the loginOAuth defined in the controller of the users
        UsersController.loginOAuth(
          profile_json.email,
          profile_json.given_name,
          profile_json.family_name,
          "google",
          profile.id,
          profile_json.picture,
          function(user) {
            return done(null, user);
          },
          function(err) {
            console.log(err);
            return done(null, false);
          }
        );
      }
    )
  );




  console.log(process.env.FACEBOOK_CLIENT_ID);
  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/auth/facebook/callback",

        profileFields: ["id", "displayName", "picture.type(large)", "email"]
      },
      function(token, tokenSecret, profile, done) {
        // we retrieve the data we need from facebook
        // We use the loginOAuth defined in the controller of the users
        UsersController.loginOAuth(
          profile.emails[0].value,
          profile.displayName.split(" ")[0],
          "",
          "facebook",
          profile.id,
          profile.photos[0].value,
          function(user) {
            return done(null, user);
          },
          function(err) {
            console.log(err);
            return done(null, false);
          }
        );
      }
    )
  );
};
