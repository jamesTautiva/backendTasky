const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./projectsModels');
const User = require('./userModels');

const Task = sequelize.define('Task', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
title: {
    type: DataTypes.STRING,
    allowNull: false,
},
description: {
    type: DataTypes.TEXT,
    allowNull: true,
},
due_date: {
    type: DataTypes.DATE,
    allowNull: true,
},
status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
},
project_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Project,
        key: 'id',
    },
},
assigned_user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: User,
        key: 'id',
    },
},
created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
}, {
timestamps: false,
});
Task.sync({force: false}).then(() => {
    console.log('tareas creadas con éxito');
}).catch((error) => {
    console.error('Hubo un error al crear las tablas:', error);
});


module.exports = Task;