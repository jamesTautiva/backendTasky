const {Sequelize} = require("sequelize");


//conetion mysql

const sequelize = new Sequelize('trello','root', '0405',{
    hostname: 'localhost',
    dialect: 'mysql',
    loggin: false,
})


sequelize.authenticate()
.then(() => {
    console.log('conecteted to database')
})
.catch((err) => {
    console.log('error conected to database',err)
})

sequelize.sync({ force: false })  // Si deseas eliminar las tablas, pon `force: true`
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

module.exports = sequelize;