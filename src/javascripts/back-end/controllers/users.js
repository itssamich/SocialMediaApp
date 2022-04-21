import passport from 'passport'
import {User} from '../models/users'
import 'express-session';
// GET /signin
export const signInPage = (req, res, next) => {
  res.render('signin')
}

// GET /signup
export const signUpPage = (req, res, next) => {
  res.render('signup')
}

// POST /api/users/signup
export const signUserUpAPI = (req, res, next) => {
 

  let user = new User ({
    username: req.body.username,
    email: req.body.email
  }) 

  User.register(user, req.body.password, function(err, user) { 
    if (err) { 
      res.json({success:false, message:"Account could not be created", err}) 
    }else{ 
      res.json({success: true, message: "Account created successfully"}) 
    } 

    res.end()
  })
}

// POST /api/users/signin
export const signUserInAPI = (req, res, next) => {
  passport.authenticate('local',  (err, user, info) => {
    if(err) res.status(500)
    else if(!user) res.status(404)

    req.logIn(user, function(err) {
      if (err) res.status(401)
      else res.status(200)
    })

    res.end()
  }
  )(req, res, next)
}

// DELETE /api/users/signout
export const signUserOutAPI = (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.end()
}