-- table household:
-- 	id
-- 	address
-- 	zip
-- 	city
-- 	state
-- 	number_bedrooms
-- 	people << household_objects.id of type people
-- 	vehicles << household_objects.id of type vehicle

CREATE TABLE household (
	id serial PRIMARY KEY,
	address varchar(255) NOT NULL,
	zip varchar(10),
	city varchar(25),
	state varchar(5),
	bedrooms_number smallint,
	created_date timestamp DEFAULT current_timestamp
);

-- table household_objects:
-- 	id
-- 	household_id
-- 	object_id
-- 	type << 'people' or 'vehicle'

CREATE TABLE household_objects (
	id serial PRIMARY KEY,
	household_id smallint NOT NULL,
	object_id smallint NOT NULL,
	created_date timestamp DEFAULT current_timestamp
);

-- table people:
-- 	id
-- 	first_name
-- 	last_name
-- 	email
-- 	age
-- 	gender
-- 	vehicles

CREATE TABLE person (
	id serial PRIMARY KEY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(100) NOT NULL,
	age varchar(100),
	gender varchar(2),
	created_date timestamp DEFAULT current_timestamp
);

-- table person_vehicles:
-- 	id
-- 	people_id
-- 	vehicle_id

CREATE TABLE person_vehicles (
	id serial PRIMARY KEY,
	person_id smallint NOT NULL,
	vehicle_id smallint NOT NULL,
	created_date timestamp DEFAULT current_timestamp
);

-- table vehicles
-- 	id
-- 	make
-- 	model
-- 	year
-- 	license_plate

CREATE TABLE vehicle (
	id serial PRIMARY KEY,
	make varchar(255) NOT NULL,
	model varchar(255) NOT NULL,
	year varchar(6) NOT NULL,
	license_plate varchar(100),
	created_date timestamp DEFAULT current_timestamp
);