const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getBuscar, getColecciones } = require('../controllers/buscarControllers');

const router = Router();

//Ruta:/api/del  buscador las consultas 

router.get('/:buscar', validarJWT, getBuscar);
router.get('/coleccion/:tabla/:buscar', validarJWT, getColecciones);


module.exports = router;