import express from 'express'

import {indexPage} from './controllers/pages'

let router = express.Router()

export function configureRoutes(app){
  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages
  router.get('/', indexPage)

  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // TODO

  app.use('/', router)
}