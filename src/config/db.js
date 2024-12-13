const {Sequelize} = require("sequelize");


//conetion mysql

const sequelize = new Sequelize({
  host: "34.29.209.142",         // Puede ser IP pública o privada de Cloud SQL
  dialect: 'mysql',
  username: "james tautiva",     // Usuario de la base de datos
  password: "0405", // Contraseña de la base de datos
  database: "tasky",     // Nombre de la base de datos
  logging: false,                    // Opcional: Desactivar logs SQL
});
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