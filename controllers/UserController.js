import bcrypt from 'bcrypt'
import User from '../models/User.js'

export async function signUp(req, res) {
    const { name, email, password } = req.body
    try {
        if (await User.findOne({ email })) {
            return res.status(409).send({ message: 'E_EMAIL_EXISTS' })
        }
        const user = new User({ name, email, password })
        await user.save()
        const publicProfile = user.getPublicProfile()
        publicProfile.token = user.generateAuthToken()
        res.status(201).json(publicProfile)
    } catch (e) {
        res.status(500).send({ message: 'E_INTERNAL_ERROR' })
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select('+password')
        if (user) {
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (passwordsMatch) {
                const publicProfile = user.getPublicProfile()
                publicProfile.token = user.generateAuthToken()
                return res
                    .header('Authorization', `Bearer ${publicProfile.token}`)
                    .status(200)
                    .send(publicProfile)
            }
            res.status(400).send({ message: 'E_INCORRECT_CREDENTIALS' })
        } else {
            res.status(400).send({
                message: 'E_INCORRECT_CREDENTIALS',
            })
        }
    } catch (error) {
        res.status(500).send({ error: 'E_INTERNAL_ERROR' })
    }
}
