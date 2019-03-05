create table Reservation (
	resid INTEGER PRIMARY KEY,
	resTime INTEGER,
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
	
	
