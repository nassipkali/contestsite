const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING}
})

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nick: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Olympiad = sequelize.define('olympiad', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})

const Work = sequelize.define('work', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    solved: {type: DataTypes.BOOLEAN}
})

const Test = sequelize.define('test', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    input: {type: DataTypes.STRING},
    output: {type: DataTypes.STRING}
})

Olympiad.hasMany(Task)
Task.belongsTo(Olympiad)

Task.hasMany(Test)
Test.belongsTo(Task)

User.hasMany(Work)
Work.belongsTo(User)

Task.hasMany(Work)
Work.belongsTo(Task)

module.exports = {
    User,
    Admin,
    Olympiad,
    Task,
    Work, 
    Test
}