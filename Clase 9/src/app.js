// child process
// delegar actividades

// const express = require('express')
import express from 'express'
const app = express()
const PUERTO = 8080
app.get("/",(req,res)=>{
    res.send('holis')
})

// function operacionCompleja(){
//     let resultado = 0
    
//     for(let i=0;i <5e9;i++){
//         resultado += i
//     }
//     return resultado
// }

// const { fork } = require('child_process')
import fork from 'child_process'
// no hace falta instalar nada, es un proceso nativo

app.get('/suma',(req,res)=>{
    // const resultado = operacionCompleja()
    // res.send('el resultado de la operacion es '+resultado)
    const child = fork("./src/operacionesComplejas.js")
    child.send("iniciando ")
    child.on("message",resultado=>{
        res.send('el resultado de la operacion es ' + resultado)
    })
})

app.listen(PUERTO,()=> console.log('todo bien, inicia el verano'))

// tenemos que lograr que suma se haga sin bloquear los demas endpoints
// se inicia el forkeo 
// 1.- separar en modulos los problemas 
    // separar la funcion que trae problemas a otro modulo 
// 2.- se modifica y se deja disponible para cuando el padre la solicite 
// 3.- Ejecutamos la ruta 

