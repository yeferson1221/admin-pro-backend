const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicosControllers');

const router = Router();

//Ruta:/api/hospita Ruta  en la carpeta rutas

router.get('/', getMedico);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        check('apellido', 'El nombre del Medico es necesario').not().isEmpty(),
        check('cargo', 'El cargo del Medico es necesario').not().isEmpty(),
        check('email', 'El Correo es obligatorio').isEmail(),
        check('hospital', 'el ID del hospital debe de ser valido').isMongoId(),

        validarCampos,
    ],
    crearMedico
);

router.put('/:id', [],
    actualizarMedico);

router.delete('/:id',

    borrarMedico
);

module.exports = router;