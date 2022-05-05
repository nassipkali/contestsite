const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        console.log(req.cookies)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token) {
            res.status(401).json({message: "No token, User not authorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.admin = decoded
        next()
    } catch(e) {
        res.status(401).json({message: "User not authorized"})
    }
}