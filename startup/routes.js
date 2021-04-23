const express = require('express')
const cors = require('cors')
const userRoute = require('../routes/user')

module.exports = function (app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/api/users', userRoute)
}
