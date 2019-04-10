drop table if exists Reviews cascade;
drop table if exists ReviewLikes cascade;
drop table if exists Customers cascade;
drop table if exists Foods cascade;
drop table if exists Restaurants cascade;
drop table if exists OpeningHours cascade;
drop table if exists RTable cascade;
drop table if exists Reserves cascade;
drop table if exists Preferences cascade;
drop table if exists Menu cascade;
drop table if exists FoodTags cascade;
drop table if exists CuisineTags cascade;
drop table if exists Franchises cascade;

create table Customers (
	custid integer primary key,
	custname varchar(100) not null,
	custphone integer not null,
	custpoints integer not null,
	custusername varchar(100) not null,
	custpassword varchar(100) not null
);

create table Preferences (
	custid integer primary key,
	cuisineTag varchar(100),
	pLocation varchar(100),
	foreign key (custid) references Customers(custid)
);

create table Franchises (
	franchiseid integer primary key,
	franchiseName varchar(100)
);

create table Restaurants (
	rid integer primary key,
	franchiseid integer,
	rname varchar(100),
	rRating integer,
	rLocation varchar(100),
	foreign key (franchiseid) references Franchises
);

create table OpeningHours (
	rid integer,
	dayInWeek integer,
	openTime char(4) not null,
	closeTime char(4) not null,
	primary key(rid, dayInWeek),
	foreign key (rid) references Restaurants
);

create table Reviews (
	reviewid integer primary key,
	rid integer,
	custid integer,
	review varchar(140),
	rating integer not null,
	foreign key (rid) references Restaurants,
	foreign key (custid) references Customers
);

create table ReviewLikes (
	reviewid integer primary key,
	custid integer not null,
	upvote boolean not null,
	foreign key (reviewid) references Reviews
);

create table RTable (
	tableid integer,
	numSeats integer,
	rid integer not null,
	primary key(tableid, rid),
	foreign key (rid) references Restaurants
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

create table Foods (
	foodid integer primary key,
	foodname varchar(100) not null
);

create table FoodTags (
	foodid integer,
	cuisineTag varchar(100),
	unique(foodid, cuisineTag),
	foreign key (foodid) references Foods
);

create table Menu (
	rid integer,
	foodid integer not null,
	price integer not null,
	unique (rid, foodid),
	foreign key (rid) references Restaurants,
	foreign key (foodid) references Foods
);
