import express from 'express'
import cors from 'cors'
import userRoute from '../routes/user.js'

export default function (app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/api/users', userRoute)
}
