import { Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import userAuth from '../middleware/userAuth.js'

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (await User.findOne({ email })) {
            return res.status(409).send({ message: 'Email already in use' })
        }
        const user = new User({ name, email, password })
        await user.save()
        const publicProfile = user.getPublicProfile()
        publicProfile.token = user.generateAuthToken()
        res.status(201).json(publicProfile)
    } catch (e) {
        res.status(500).send({ message: 'Something went wrong.' })
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (user) {
        bcrypt.compare(password, user.password).then((result) => {
            if (result) {
                const publicProfile = user.getPublicProfile()
                publicProfile.token = user.generateAuthToken()
                return res
                    .header('Authorization', `Bearer ${publicProfile.token}`)
                    .status(200)
                    .send(publicProfile)
            } else {
                return res.status(401).send({ message: 'Incorrect password' })
            }
        })
    } else {
        res.status(401).send('User with this email has not been found')
    }
})

export default router
