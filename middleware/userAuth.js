import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'E_ACCESS_DENIED' })
    }
    const token = req.headers.authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.token = token
        req.user = user
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'E_INVALID_TOKEN',
        })
    }
}
