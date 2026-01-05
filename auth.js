const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./models/person') // for authentication

// authenticating user through passport local strategy
// done(error, user, info)
passport.use(new localStrategy(async (USERNAME, password, done) => {
  try {
    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isPasswordMatch = await user.isValidPassword(password);
    if (!isPasswordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;