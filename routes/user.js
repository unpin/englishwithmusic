const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (await User.findOne({ email })) {
            return res.status(409).send({ message: 'Email already in use' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
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

module.exports = router
