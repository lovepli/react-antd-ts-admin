//  token权限验证

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const config = require('../config');


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.jwtKey;


const passport = (passport) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const User = mongoose.model('User');
    const result = await User.findById(jwt_payload.id);
    if (result) {
      done(null, result);
    } else {
      done(null, false);
    }
  }));
}

module.exports = passport;