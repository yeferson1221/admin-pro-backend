const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileFotos, retornaImagen } = require('../controllers/fotosUploads');


const router = Router();

//Ruta:/api/subir laas fotos 
router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, fileFotos);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;