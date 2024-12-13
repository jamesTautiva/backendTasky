const express = require('express');
const sequelize = require('./src/config/db.js');
const cors = require('cors');
const apiRoutes = require('./src/router/api');

const app = express();

app.use(express.json());

// habilitar cors

app.use(cors());

// routes

app.use('/api', apiRoutes);


//conectar servidor

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
});

