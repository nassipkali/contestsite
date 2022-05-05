const {Task, Test, Admin, Olympiad} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, nick) => {
    return jwt.sign(
        {id, nick},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class AdminController {
    async login(req, res, next) {
        const {nick, password} = req.body
        if(!password) {
            return next(ApiError.internal('Не введен пароль'))
        }
        if(!nick) {
            return next(ApiError.internal('Не введен ник'))
        }
        const admin = await Admin.findOne({where: {nick}})
        if(!admin) {
            return next(ApiError.internal('Пользователя не существует'))
        }

        let comparePassword = bcrypt.compareSync(password, admin.password)
        if(!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(admin.id, admin.nick)
        return res.json({token:token, nick: admin.nick})
    }
    async check(req, res) {
        return res.json({nick: req.admin.nick})
    }
    async createOlymp(req, res) {
        console.log("req body")
        console.log(req.body)
        const {name} = req.body
        const olymp = await Olympiad.create({name: name})
        return res.json(olymp)
    }
    async getOlymps(req, res) {
        const olymps = await Olympiad.findAll()
        return res.json(olymps)
    }
    // olympid, title, description
    async setTask(req, res) {
        const {olympid, title, description} = req.body
        const task = await Task.create({olympiadId: olympid, title: title, description: description})
        return res.json(task)
    }
    async getTasks(req, res) {
        const {olympid} = req.body
        const tasks = await Task.findAll({
            where: {
                olympiadId: olympid
            }
        })
        return res.json(tasks)
    }
    // taskid, input, output, score
    async test(req, res) {
        const {taskid, input, output, score} = req.body
        const test = await Test.create({taskId: taskid, input: input, output: output, score: score})
        return res.json(test)
    }
    async start(req, res) {
        const {olympid, time} = req.body
        startedOlymps[olympid] = Math.floor((Date.now() / 1000)) + time
        return res.json({status: "started"})
    }
    async status(req, res) {
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
    
}

module.exports = new AdminController()