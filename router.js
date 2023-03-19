const express = require('express');
const router = express.Router();


let conexion= require('./database/db');

/* router.get('/',(req,res)=>{
    res.send('Contacto');
}) */

router.get('/api/productos', (req,res)=>{
    conexion.query('SELECT * FROM producto', (error, fila)=>{
        if (error){
            throw error;
        } else {
            res.send(fila);
        }
    })
})

router.get('/api/productos/:id', (req,res)=>{
    conexion.query('SELECT * FROM producto WHERE idProducto = ?', [req.params.id], (error, result)=>{
        if (error){
            throw error;
        } else {
            res.send(result);
        }
    })
})

router.post('/api/productos', (req,res)=>{
    let data = {NombreProducto:req.body.NombreProducto, Comentarios:req.body.Comentarios, Descripcion:req.body.Descripcion, Categoria:req.body.Categoria, Estatus:req.body.Estatus}
    let sql = "INSERT INTO producto SET ?"
    conexion.query(sql, data, (err, result)=>{
        if (err){
            throw err;
        } else {
            Object.assign(data, {id: result.insertId})
            res.send(data);
        }
    })
})

router.put('/api/productos/:id', (req,res)=>{
    let idProducto = req.params.id
    let NombreProducto = req.body.NombreProducto
    let Comentarios = req.body.Comentarios
    let Descripcion = req.body.Descripcion
    let Categoria = req.body.Categoria
    let Estatus = req.body.Estatus
    let sql = "UPDATE producto SET NombreProducto = ?, Comentarios = ?, Descripcion = ?, Categoria = ?, Estatus = ? WHERE idProducto = ?"
    conexion.query(sql, [NombreProducto, Comentarios, Descripcion, Categoria, Estatus, idProducto], (error, results)=>{
        if (error){
            throw error
        } else {
            res.send(results)
        }
    })
})

router.delete('/api/productos/:id', (req,res)=>{
    conexion.query('DELETE FROM producto WHERE idProducto = ?', [req.params.id], (error, fila)=>{
        if (error){
            throw error;
        } else {
            res.send(fila);
        }
    })
})

module.exports= router;