import express from 'express'

import {signInPage, signUpPage, signUserUpAPI, signUserInAPI, signUserOutAPI} from './controllers/users'
import {getAllComments, homePageAPI, indexPage, newPost, updateLikes, deletePost, newPostAPI, postPage, newCommentAPI} from './controllers/pages'


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
  router.get('/home', requireSignIn, indexPage)
  router.get('/post/view/:id', postPage)
  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)
  router.get('/post/new', requireSignIn, newPost)
  router.get('/post/:id/comments', getAllComments)
  router.get('/api/post/all', homePageAPI)

  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // TODO

  router.post('/api/comment/new', newCommentAPI)

  router.post('/api/post/new', newPostAPI)
  router.post('/api/users/signup', signUserUpAPI)
  router.post('/api/users/signin', signUserInAPI)
  router.put('/api/post/:id/like', updateLikes)
  router.delete('/api/post/:id', deletePost)
  router.delete('/api/users/signout', signUserOutAPI)

  app.use('/', router)
}