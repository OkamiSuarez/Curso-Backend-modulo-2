// Bcrypt es una libreria de hashing de contrase;as
// instalamos npm install bcrypt
// se importa
import bcrypt from "bcrypt"

// se crean dos funciones 
// createHash aplica el hash al password
// isValidPassword compara el pasword proporcionado por la db

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// hashSync() toma el password y aplica el proceso a partir de un salt
// un salt es un string random que usa el string para codificar la contrase;a 

// en este caso se generara un salt de 10 caracteres

// validacion del password
export const isValidPassword = (password,user) => bcrypt.compareSync(password,user.password)

// compara los passwords y retorna true o false 
