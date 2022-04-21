import express from 'express'

import {indexPage} from './controllers/pages'
import {signInPage, signUpPage, signUserUpAPI, signUserInAPI, signUserOutAPI} from './controllers/users'
import {postPage} from './controllers/pages'


let router = express.Router()

function isSignedIn(req){
  return req.isAuthenticated && req.isAuthenticated()
}

function requireSignIn(req, res, next) {
  if(isSignedIn(req)){
    next()
  }else{
    res.status(401).json("unauthorized request")
    res.end()
  }
}
export function configureRoutes(app){
  app.all('*', async (req, res, next)=>{
    app.locals.signedIn = isSignedIn(req) 
    res.cookie("authenticated", app.locals.signedIn)
    next() 
  })
  
  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages
  router.get('/', indexPage)
  router.get('/post/:id', postPage)

  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // TODO
  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)

  router.post('/api/users/signup', signUserUpAPI)
  router.post('/api/users/signin', signUserInAPI)
  router.delete('/api/users/signout', signUserOutAPI)

  app.use('/', router)
}