//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorPeliculas = require("./controladores/controladorPeliculas.js");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.get('/peliculas', controladorPeliculas.listarPeliculas);
app.get('/generos', controladorPeliculas.listarGeneros);
app.get('/peliculas/recomendacion', controladorPeliculas.listarRecomendaciones);

app.get('/peliculas/:id', controladorPeliculas.detallePelicula);


app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

