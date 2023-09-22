const mongoose = require('mongoose');
const express = require('express');
const app = require('./app'); //crear protocolo de transferencia
const http = require('http');
const server = http.createServer(app);
const path = require('path');

server.listen(3000, () => {
    console.log('El servidor esta corriendo');
})

app.use(express.json()) //importante

app.use('/', express.static(path.resolve('views', 'home')))

