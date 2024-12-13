const sequelize = require('./models/index');
const { User, Project, Task } = require('./models');

sequelize.sync({ force: true })  // `force: true` borra las tablas existentes y las recrea
.then(() => {
    console.log('Tablas sincronizadas');
})
.catch(err => {
    console.error('Error al sincronizar las tablas:', err);
});