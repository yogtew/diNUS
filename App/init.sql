drop table if exists Reviews cascade;
drop table if exists Customers cascade;
drop table if exists Food cascade;
drop table if exists Restaurants cascade;
drop table if exists RTable cascade;
drop table if exists Reserves cascade;
drop table if exists Preferences cascade;
drop table if exists CuisineTags cascade;

create table Customers (
	custid integer primary key,
	name varchar(100) not null,
	phone integer not null,
	points integer not null,
	username varchar(100) not null,
	password varchar(100) not null
);

create table Restaurants (
	rid integer,
	rname varchar(100),
	rRating integer,
	rLocation varchar(100),
	openTime char(4),
	closeTime char(4),
	primary key(rid)
);

create table Reviews (
	rid integer,
	review varchar(140),
	custid integer,
	rating integer not null,
	foreign key (rid) references Restaurants,
	foreign key (custid) references Customers,
	primary key (rid, custid)
);

create table RTable (
	tableid integer,
	rid integer not null,
	primary key(tableid, rid),
	foreign key (rid) references Restaurants
	on delete cascade
);


create table Reserves (
	resid serial primary key,
	restime timestamp,
	restpax integer,
	tableid integer,
	rid integer,
	custid integer,
	foreign key (tableid, rid) references RTable (tableid, rid),
	foreign key (rid) references Restaurants (rid),
	foreign key (custid) references Customers (custid)
	);

create table Food (
	foodname varchar(60),
	price integer not null,
	rid integer not null,
	primary key(foodname, rid),
	foreign key (rid) references Restaurants
	on delete cascade
);

create table Preferences (
	custid integer primary key
	cuisineType varchar(100),
	pLocation varchar(100),
	openingHours varchar(100),
	foreign key (custid) references Customers(custid)
	on delete cascade
);

create table CuisineTags (
	rid integer,
	tag varchar(100),
	primary key (rid, tag),
	foreign key (rid) references Restaurants
);
