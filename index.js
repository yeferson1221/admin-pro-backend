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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicosRutas'));
app.use('/api/todo', require('./routes/buscarRutas'));
app.use('/api/fotosUploads', require('./routes/fotosUploads'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('servidor montado' + process.env.PORT);
});