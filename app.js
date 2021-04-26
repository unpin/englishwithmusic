import express from 'express'
import routes from './startup/routes.js'
import database from './startup/database.js'

const app = express()

routes(app)
database(app)
