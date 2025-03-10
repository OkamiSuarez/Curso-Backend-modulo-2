// proceso de argumentos de commander

// npm i commander

import { Command } from "commander";

const program = new Command()

// 1.- comando, 2.-descripcion, 3.-valor por default
program
    .option("-p <port>","Puerto donde se inicia el server", 8080)
    .option("--mode <mode>","Modo de trabajo","desarrollo")
program.parse()

// con esto se pueden ver todas las opciones configuradas
console.log("opciones", program.opts())

export default program