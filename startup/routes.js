import express from 'express'
import cors from 'cors'
import errorHandler from '../routes/errorHandler.js'
import userRoute from '../routes/user.js'

export default function (app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/api/users', userRoute)
    /*
    Note:
    The error handling middleware should be placed last among other middleware
    and routes in order for it to function properly.
     */
    app.use(errorHandler)
}
