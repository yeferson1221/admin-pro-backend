require('dotenv').config();
const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./basedatos/config');

//crear servidor de express
const app = express();

//configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//BD
dbConnection();

//rutas
app.use('/api/usuarios', require('./routes/usuariosRutas'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('servidor montado' + process.env.PORT);
});