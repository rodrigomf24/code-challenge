CREATE DATABASE codechallenge;

CREATE TABLE household (
	id serial PRIMARY KEY,
	address varchar(255) NOT NULL,
	zip varchar(10),
	city varchar(25),
	state varchar(5),
	bedrooms_number smallint,
	created_date timestamp DEFAULT current_timestamp
);

CREATE TABLE household_objects (
	id serial PRIMARY KEY,
	household_id smallint NOT NULL,
	object_id smallint NOT NULL,
    type varchar(30) NOT NULL,
	created_date timestamp DEFAULT current_timestamp
);

CREATE TABLE person (
	id serial PRIMARY KEY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(100) NOT NULL,
	age varchar(100),
	gender varchar(2),
	created_date timestamp DEFAULT current_timestamp
);


CREATE TABLE vehicle (
	id serial PRIMARY KEY,
	make varchar(255) NOT NULL,
	model varchar(255) NOT NULL,
	year varchar(6) NOT NULL,
	license_plate varchar(100),
    owner smallint,
	created_date timestamp DEFAULT current_timestamp
);