export { }
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts: any = {}
const User = require("../models/userModel");
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SuperPuperSecret';

passport.use(new JwtStrategy(opts, function (jwt_payload: any, done: any) {
    User.findOne({ id: jwt_payload.id }, function (err: any, user: any) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));