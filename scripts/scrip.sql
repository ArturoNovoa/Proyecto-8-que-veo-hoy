CREATE TABLE pelicula (
    id INT NOT NULL auto_increment,
    titulo VARCHAR(100) NOT NULL,
    duracion INT (5),
    director VARCHAR(400),
    anio INT (5),
    fecha_lanzamiento DATE,
    puntuacion INT (2),
    poster VARCHAR (300),
    trama VARCHAR(700),
    PRIMARY KEY (id)
)


CREATE TABLE genero (
    id INT NOT NULL auto_increment,
    nombre VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE actor(
    id INT NOT NULL auto_increment,
    nombre VARCHAR (70),
    PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula(
    id INT NOT NULL auto_increment,
    actor_id int not null,
    pelicula_id int not null,
    primary key (id),
    foreign key (actor_id) REFERENCES actor(id),
    foreign key (pelicula_id) REFERENCES pelicula(id)
);