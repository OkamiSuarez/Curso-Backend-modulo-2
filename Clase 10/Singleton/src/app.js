import {ConnectionDB} from "./connectionDB.js";

const firstInstance = ConnectionDB.getInstance()
const secondInstance = ConnectionDB.getInstance()