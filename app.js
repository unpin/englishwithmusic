const express = require('express')
const routes = require('./startup/routes')
const database = require('./startup/database')

const app = express()

routes(app)
database(app)
