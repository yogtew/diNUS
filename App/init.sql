drop table IF EXISTS Reviews CASCADE;
drop table IF EXISTS Customers CASCADE;
drop table IF EXISTS Menu CASCADE;
drop table IF EXISTS Restuarant cascade;
drop table IF EXISTS RTable cascade;

create table Reviews (
	rid INTEGER PRIMARY KEY,
	review VARCHAR(140),
	userid INTEGER NOT NULL,
	rating INTEGER NOT NULL
	FOREIGN KEY (userid) REFERENCES Users
);

create table Customers (
	userid INTEGER PRIMARY KEY,
	phone INTEGER NOT NULL,
	points INTEGER NOT NULL
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

create table Restaurant(
	rid 	integer
	rRating integer
	rCuisineType varchar(100)
	rLocation vchar(100)
	rOpeninghours varchar(100)
	primary key(rid)
);

create table rTable(
	tableId integer
	rid integer not null 
	primary key(tableId)
	foreign key (rid) references restaurant
);

create table Menu (
	name VARCHAR(60) PRIMARY KEY,
	price INTEGER NOT NULL,
	rid INTEGER NOT NULL,
	FOREIGN KEY (rid) REFERENCES Restaurants
);

create table Preferences (
	userid VARCHAR(100) PRIMARY KEY REFERENCES Customers(userId) ON DELETE CASCADE,
	cuisineType VARCHAR(100),
	pLocation VARCHAR(100),
	openingHours VARCHAR(100)
);

