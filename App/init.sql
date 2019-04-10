drop table if exists PaymentMode cascade;
drop table if exists Promotion cascade;
drop table if exists Reviews cascade;
drop table if exists ReviewLikes cascade;
drop table if exists Customer cascade;
drop table if exists Food cascade;
drop table if exists Restaurant cascade;
drop table if exists OpeningHours cascade;
drop table if exists RTable cascade;
drop table if exists Reserves cascade;
drop table if exists Preferences cascade;
drop table if exists Menu cascade;
drop table if exists Tags cascade;
drop table if exists TagType cascade;
drop table if exists Franchise cascade;
drop table if exists LocationPreferences cascade;
drop table if exists FoodPreferences cascade;

create table Customer (
	custid integer primary key,
	custname varchar(100) not null,
	phone integer not null,
	points integer not null,
	username varchar(100) not null,
	pw varchar(100) not null,
	unique(custid, custname)
);

create table TagType(
	tagid integer primary key,
	tagtype varchar(100)
);

create table LocationPreferences (
	custid integer,
	pLocation varchar(100),
	primary key (custid, pLocation),
	foreign key (custid) references Customer(custid)
);

create table FoodPreferences (
	custid integer,
	tagid integer,
	primary key (custid, tagid),
	foreign key (tagid) references TagType
);

create table Franchise (
	franchiseid integer primary key,
	franchiseName varchar(100)
);

create table Restaurant (
	rid serial primary key,
	franchiseid integer,
	rname varchar(100),
	rRating integer,
	rLocation varchar(100),
	foreign key (franchiseid) references Franchise
);

create table OpeningHours (
	rid integer,
	dayInWeek integer,
	openTime char(4) not null,
	closeTime char(4) not null,
	primary key(rid, dayInWeek),
	foreign key (rid) references Restaurant
);

create table Reviews (
	reviewid integer primary key,
	rid integer,
	custid integer,
	review varchar(140),
	rating integer not null,
	foreign key (rid) references Restaurant,
	foreign key (custid) references Customer
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
	foreign key (rid) references Restaurant
);

create table PaymentMode (
	cardid char(16) primary key,
	custid integer not null,
	custname varchar(100) not null,
	foreign key (custid, custname) references Customer(custid, custname)
);

create table Reserves (
	resid serial primary key,
	cardid char(16),
	restime timestamp,
	respax integer,
	tableid integer,
	rid integer,
	custid integer,
	foreign key (tableid, rid) references RTable (tableid, rid),
	foreign key (rid) references Restaurant (rid),
	foreign key (custid) references Customer (custid),
	foreign key (cardid) references PaymentMode
);

create table Food (
	foodid serial primary key,
	foodname varchar(100) not null
);

create table Tags(
	foodid integer,
	tagid integer,
	foreign key (tagid) references TagType,
	foreign key (foodid) references Food,
	primary key (foodid, tagid)
);



create table Menu (
	rid integer,
	foodid integer,
	price integer not null,
	primary key (rid, foodid),
	foreign key (rid) references Restaurant,
	foreign key (foodid) references Food
);

create table Promotion (
	promoid integer primary key,
	rid integer,
	discount integer,
	foreign key (rid) references Restaurant
);
