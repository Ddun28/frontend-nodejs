require('dotenv').config();
const express = require('express');
const app = express(); //crea una nueva aplicacion express en la variable app

//para poder utilizar el modulo de mongoose
const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Te has conectado a MongoDB')
    } catch (error) {
        console.log(error)
    }
})()

//luego iniciar el servidor
module.exports = app;
