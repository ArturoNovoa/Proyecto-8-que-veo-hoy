var con = require("../lib/conexionbd");

function listarPeliculas(req, res) {
  let filtro = req.query;
  let sql = "select * from pelicula where 1 = 1";

  if (filtro.titulo !== undefined) {
    sql += " and titulo like '" + filtro.titulo + "%'";
  }

  if (filtro.genero !== undefined) {
    sql += " and genero_id = '" + filtro.genero + "'";
  }
  if (filtro.anio !== undefined) {
    sql += " and anio like '" + filtro.anio + "%'";
  }
  if (filtro.columna_orden !== undefined && filtro.tipo_orden !== undefined) {
    sql += " order by " + filtro.columna_orden + " " + filtro.tipo_orden;
  }

  con.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("hubo un error al consultar la base de datos", error.message);
    } else {
      var totalResultados = resultado.length;
      var inicio = filtro.pagina * filtro.cantidad - filtro.cantidad + 1;
      sql += " limit " + inicio + "," + filtro.cantidad;

      con.query(sql, function(error, resultado, fields) {
        var respuesta = { peliculas: resultado, total: totalResultados };
        res.send(respuesta);
      });
    }
  });
}

function listarGeneros(req, res) {
  sql = "select * from genero";
  con.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("Se pudrio todo", error.message);
    } else {
      var respuesta = { generos: resultado };
      res.send(respuesta);
    }
  });
}

function detallePelicula(req, res) {
  var id = req.params.id;
  var queryPeli = "select * from pelicula where id = " + id;
  let queryActores =
    "select a.nombre from actor a join actor_pelicula ap on a.id = ap.actor_id join pelicula p on ap.pelicula_id = p.id where p.id = " +
    id;
  let queryGenero =
    "select g.nombre from genero g join pelicula p on g.id = p.genero_id where p.id =  " +
    id;

  con.query(queryPeli, function(error, resultado, fields) {
    if (error) {
      console.log("Se pudrio todo", error.message);
    } else {
      var res_pelicula = resultado;
      var res_actores;

      con.query(queryActores, function(error, resultado, fields) {
        if (error) {
          console.log("Se pudrio todo", error.message);
        } else {
          res_actores = resultado;

          con.query(queryGenero, function(error, resultado, fields) {
            if (error) {
              console.log("Se pudrio todo", error.message);
            } else {
              let respuesta = {
                pelicula: res_pelicula[0],
                actores: res_actores[0],
                genero: resultado[0]
              };
              res.send(JSON.stringify(respuesta));
            }
          });
        }
      });
    }
  });
}

function listarRecomendaciones(req, res) {


  var req_genero = req.query.genero;
  var req_anioInicio = req.query.anio_inicio;
  var req_fin = req.query.anio_fin;
  var req_puntuacion = req.query.puntuacion;


  var peliRecomendada =
    "select * from pelicula p join genero g where 1=1";

  if(req_genero !== undefined){
  peliRecomendada += " and g.nombre = \"" + req_genero + "\"";
  };

  if(req_anioInicio !== undefined && req_fin !== undefined){
  peliRecomendada += " and anio between " + req_anioInicio + " and " + req_fin;
  };

  if(req_puntuacion !== undefined){
  peliRecomendada += " and p.puntuacion > \"" + req_puntuacion + "\"";
  }

  con.query(peliRecomendada, function(error, resultado, fields) {
    if (error) {
       
      console.log("Se pudrio todo", error.message);

    } else {
      var listaRecomendadas = {
              peliculas: resultado
            };
            res.send(listaRecomendadas);
    }
  });
}

module.exports = {
  listarPeliculas: listarPeliculas,
  listarGeneros: listarGeneros,
  detallePelicula: detallePelicula,
  listarRecomendaciones: listarRecomendaciones
};
