create table Reviews (
	rid 			INTEGER PRIMARY KEY,
	review			VARCHAR(140),
	userid			INTEGER NOT NULL,
	rating			INTEGER NOT NULL
	FOREIGN KEY (userid) REFERENCES Users
);

create table Customers (
	userid 			INTEGER PRIMARY KEY,
	phone	 		INTEGER NOT NULL,
	points 			INTEGER NOT NULL
);

create table Menu (
	name		VARCHAR(60) PRIMARY KEY,
	price		INTEGER NOT NULL,
	rid			INTEGER NOT NULL,
	FOREIGN KEY (rid) REFERENCES Restaurants
);

create table Reservation (
	resid INTEGER PRIMARY KEY,
	resTime DATETIME,
	tableid INTEGER,
	rid INTEGER,
	userid INTEGER,
	FOREIGN KEY (tableid) REFERENCES rTable,
	FOREIGN KEY (rid) REFERENCES Restaurants,
	FOREIGN KEY (userid) REFERENCES Customers
);

create table Administrator (
	userid INTEGER PRIMARY KEY
);

drop table IF EXISTS Reviews CASCADE;
drop table IF EXISTS Customers CASCADE;
drop table IF EXISTS Menu CASCADE;

