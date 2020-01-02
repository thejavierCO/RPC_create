const express = require("express");
const morgan = require("morgan");
const firebase = require('firebase');
const app = express();

firebase.initializeApp(require("./keys/keys"));
//medios
app.use(express.json());
app.use(morgan('dev'));

//rutas
app.use("/api",require('./rutas/init.js'));

app.listen(8000,()=>{console.log("run")})