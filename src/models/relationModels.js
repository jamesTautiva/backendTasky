const sequelize = require('../config/db');
const User = require('./userModels');
const Project = require('./projectsModels');
const Task = require('./taskModels');

// Relación uno a muchos: Un usuario puede tener muchos proyectos
User.hasMany(Project, { foreignKey: 'user_id' });
Project.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Task, { foreignKey: 'assigned_user_id' });
Task.belongsTo(User, { foreignKey: 'assigned_user_id' });

module.exports = { User, Project, Task };