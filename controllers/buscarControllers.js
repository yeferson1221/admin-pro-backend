const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');

const getBuscar = async(req, res = response) => {

    const buscar = req.params.buscar;
    const regex = new RegExp(buscar, 'i');

    //forma lenta por que carga 3 archivos 
    //const usuarios = await Usuario.find({ nombre: regex });
    //const medicos = await Medico.find({ nombre: regex });
    //const hospitales = await Hospital.find({ nombre: regex });
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),

    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}

const getColecciones = async(req, res = response) => {
    const tabla = req.params.tabla;
    const buscar = req.params.buscar;
    const regex = new RegExp(buscar, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospitales', 'nombre img');

            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');

            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla o coleccion tiene que ser usurios/medicos/hospitales'
            });

    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getBuscar,
    getColecciones
}