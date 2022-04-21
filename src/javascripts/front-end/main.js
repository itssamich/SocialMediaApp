// Required by Webpack - do not touch
require('../../favicon.ico')
require.context('../../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'


import SignInForm from './components/SignInForm'
import SignOut from './components/SignOut'
import SignUpForm from './components/SignUpForm'
import NewPost from './components/newPost'

if(document.querySelector('#signin')) {
  ReactDOM.render(<SignInForm/>, document.querySelector('#signin'))
} else if(document.querySelector('#signup')) {
  ReactDOM.render(<SignUpForm/>, document.querySelector('#signup'))
} else if(document.querySelector('#signout')) {
  ReactDOM.render(<SignOut/>, document.querySelector('#signout'))
}
if(document.querySelector('#newpost')){
  ReactDOM.render(<NewPost />, document.querySelector("#newpost"))
}

//ReactDOM.render(<App/>, document.querySelector('#main'))

