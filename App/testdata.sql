-- Initialize database with test data

-- Load data for testcase 1
delete from OpeningHours cascade;
DELETE FROM Reviews CASCADE;
DELETE FROM Reserves CASCADE;
DELETE FROM Customers CASCADE;
delete from Menu cascade;
delete from Foodtags cascade;
delete from Foods cascade;
DELETE FROM RTable CASCADE;
DELETE FROM Restaurants CASCADE;
DELETE FROM Preferences CASCADE;


INSERT INTO Customers (custid, custname, custphone, custpoints, custusername, custPassword) VALUES
(1, 'Alice Tan', 81234567, 0, 'aliceinwonderland', 'alicetrox123'),
(2, 'Bernard Lee', 98512383, 0, 'bernardHappyFood', 'hamburgersrealcool'),
(3, 'Charles Wong', 82347632, 0, 'smileyman', 'smileymaneats123!');

INSERT INTO Restaurants(rid, rname, rRating, rLocation) VALUES
(1, 'McDolans', 8, 'Central'),
(2, 'Dining Hall', 2, 'West'),
(3, 'Ameens', 8, 'North');

insert into OpeningHours(rid, dayInWeek, openTime, closeTime) values
(1, 1, '0600', '2200'),
(1, 2, '0600', '2200'),
(1, 3, '0600', '2200'),
(1, 4, '0600', '2200'),
(1, 5, '0600', '2200'),
(1, 6, '0600', '2330'),
(1, 0, '0600', '2330'),
(2, 1, '0700', '2130'),
(2, 2, '0700', '2130'),
(2, 3, '0700', '2130'),
(2, 4, '0700', '2130'),
(2, 5, '0700', '2130'),
(2, 6, '1300', '0030'),
(3, 1, '0800', '0300'),
(3, 2, '0800', '0300'),
(3, 3, '0800', '0300'),
(3, 4, '0800', '0300'),
(3, 5, '0800', '0300'),
(3, 6, '0800', '0300');

insert into Reviews(reviewid, rid, custid, review, rating) values
(1, 1, 1, 'Very good', 7),
(2, 2, 2, 'Food too salty', 3),
(3, 3, 1, 'Expensive', 5);

INSERT INTO RTable(tableid, numSeats, rid) VALUES
(1, 2, 1),
(2, 2, 1),
(1, 2, 2),
(2, 4, 2),
(3, 6, 2),
(4, 6, 2),
(5, 8, 2),
(1, 2, 3),
(2, 4, 3),
(3, 6, 3),
(4, 8, 3),
(5, 10,3);

--INSERT INTO Reserves(resid, restime, tableid, rid, custid) VALUES
--(1, '2019-03-19 18:00:00', 1, 1, 1);

insert into Foods (foodid, foodname) values
(1, 'Fried Chicken Wings'),
(2, 'Cheese fries'),
(3, 'Baked potato'),
(4, 'Ice Kacang'),
(5, 'Seafood Fried Rice'),
(6, 'Fishball Noodles'),
(7, 'Pad Thai'),
(8, 'Fish and Chips'),
(9, 'Prata');


insert into FoodTags (foodid, cuisinetag) values
(1, 'Western'),
(2, 'Western'),
(3, 'Western'),
(4, 'Singaporean'),
(5, 'Chinese'),
(6, 'Chinese'),
(7, 'Thai'),
(8, 'Western'),
(9, 'Indian');


insert into Menu(rid, foodid, price) values
(1, 1, 5),
(1, 2, 3),
(1, 3, 2),
(1, 8, 7),
(2, 4, 3),
(2, 5, 5),
(2, 6, 4),
(2, 3, 1),
(3, 9, 2),
(3, 2, 4);