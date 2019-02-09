const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
// we don't need bcrypt because we won't be dealing with any passwords

const User = require('../../models/user-model');

passport.use(new SlackStrategy({
  // clientID and clientSecret are given names from Slack API
  // slackClientId is the name we gave to our variable in .env
  clientID: process.env.slackClientId,
  clientSecret: process.env.slackClientSecret,
  callbackURL: '/slack/callback',
  proxy: true // not important now, but yes when in production
}, ( accessToken, refreshToken, userInfo, cb ) => {
  // console.log('who is this: ', userInfo);
  const {email, name} = userInfo.user; //<===ES6 destructuring
  User.findOne({$or: [
     {email: email},
     {slackID: userInfo.user.id}
  ]})
    .then(user =>{
      if(user){
        cb(nul, user);
        return;
      }
      User.create({
        email,
        fullName: name,
        slackID: userInfo.user.id
      })
        .then(newUser =>{
          cb(null, newUser);
        })
        .catch(err => next (err))
    })
    .catch(err => next(err))

}))