const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Access denied. Please authenticate.')
    }
    const token = req.headers.authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.send('Access denied. Authentication Token is not valid.')
        }
        req.user = decoded
        req.token = token
        next()
    })
}
