const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Task, Work} = require('../models/models')
const res = require('express/lib/response')
const fs = require('fs')


const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res, next) {
        const {email, password, name} = req.body
        console.log(email)
        if(!email || !password || !name) {
            return next(ApiError.badRequest('Not correct email or pass'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with email exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email:email, password: hashPassword, name: name})
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal('Пользователя не существует'))
        }
        if(!password) {
            return next(ApiError.internal('Не введен пароль'))
        }
        console.log(user.password)
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }
    async check(req, res, next) {
        //const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({name: req.user.name})
    }
    async olymps(req, res) {
        const olymps = await Olympiad.findAll()
        return res.json(olymps)
    }
    async olympStatus(req, res) {
        const {olympid} = req.body
        if(!(olympid in startedOlymps)) {
            return res.json({status: "not started"})
        } 
        const time = startedOlymps[olympid]
        if(time < Math.floor(Date.now() / 1000)) {
            return res.json({status: "expired"})
        }
        else {
            return res.json({status: "started", endTime: time})
        }
    }
    async tasks(req, res, next) {
        const {olympid} = req.body
        const tasks = await Task.findAll({
            where: {
                olympiadId: olympid
            }
        })
        return res.json(tasks)
    }
    async push(req, res, next) {
        const {olympid, taskid, code, language} = req.body
        const userid = req.user.id
        const folderName = `./{userid}/{olympid}/{taskid}`
        if(!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    }
    async taskStatus(req, res) {
        const {taskid} = req.body
        const userid = req.user.id
        const work = await Work.findOne({
            where: {
                taskId: taskid,
                userId: userid
            }
        })
        return res.json(work.solved)
    }
}

module.exports = new UserController()