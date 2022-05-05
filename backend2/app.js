require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const {Admin} = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 80

global.startedOlymps = {}

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(express.static('public'))

// Error handling
app.use(errorHandler)

app.get('/', (req,res) => {
    res.status(200).json({message: 'Works'})
}) 

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        const admin = await Admin.findOne()
        console.log(admin)
        if(!admin) {
            const adminLogin = process.env.ADMIN_LOGIN
            const adminPass = process.env.ADMIN_PASS
            const hashPassword = await bcrypt.hash(adminPass, 5)
            await Admin.create({nick:adminLogin, password:hashPassword})
        }
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()
