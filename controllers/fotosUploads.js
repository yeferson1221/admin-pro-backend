const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileFotos = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    //valedacion de la carperta donde va la foto 
    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposPermitidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Nos es un medico,usuario u hospital (tipo)'
        });
    }
    //Validacion de existencia de un archivo 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //procesar la imagen ...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen 
    const path = `./uploadsFotos/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        //actualizar bd
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });
}
const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploadsFotos/${ tipo }/${ foto }`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {

        const pathImg = path.join(__dirname, `../uploadsFotos/error.jpg`);
        res.sendFile(pathImg);
    }

}




module.exports = {
    fileFotos,
    retornaImagen
}