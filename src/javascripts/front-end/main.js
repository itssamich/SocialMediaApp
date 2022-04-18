// Required by Webpack - do not touch
require('../../favicon.ico')
require.context('../../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import 'bootstrap'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(<App course="Full stack JavaScript development" framework="the MERN stack"/>, 
                document.querySelector('#main'))

