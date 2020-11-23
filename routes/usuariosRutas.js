const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuariosControllers');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Ruta:/api/usuariosRuta  en la carpeta rutas
router.get('/', validarJWT, getUsuarios);
router.post('/', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Correo es obligatorio').isEmail(),
    validarCampos,


], crearUsuario);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El Correo es obligatorio').isEmail(),
    check('role', 'El Rol es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);

module.exports = router;