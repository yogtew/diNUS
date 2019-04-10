-- Initialize database with test data

-- Load data for testcase 1
delete from Promotion cascade;
delete from PaymentMode cascade;
delete from OpeningHours cascade;
delete from ReviewLikes cascade;
DELETE FROM Reviews CASCADE;
DELETE FROM Reserves CASCADE;
DELETE FROM Customer CASCADE;
delete from Menu cascade;
delete from Tags cascade;
delete from TagType cascade;
delete from Food cascade;
DELETE FROM RTable CASCADE;
DELETE FROM Restaurant CASCADE;
DELETE FROM Preferences CASCADE;

INSERT INTO Customer (custid, custname, phone, points, username, pw) VALUES
(1, 'Alice Tan', 81234567, 0, 'aliceinwonderland', 'alicetrox123'),
(2, 'Bernard Lee', 98512383, 0, 'b', '1'),
(3, 'Charles Wong', 82347632, 0, 'smileyman', 'smileymaneats123!');

insert into PaymentMode(cardid, custid, custname) values
('1111111111111111', 1, 'Alice Tan'),
('1111111111111112', 1, 'Alice Tan'),
('1111111111111113', 2, 'Bernard Lee'),
('1111111111111114', 3, 'Charles Wong');


INSERT INTO Restaurant(rid, rname, rRating, rLocation) VALUES
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

insert into Food (foodid, foodname) values
(1, 'Fried Chicken Wings'),
(2, 'Cheese fries'),
(3, 'Baked potato'),
(4, 'Ice Kacang'),
(5, 'Seafood Fried Rice'),
(6, 'Fishball Noodles'),
(7, 'Pad Thai'),
(8, 'Fish and Chips'),
(9, 'Prata'),
(10, 'Laksa');

insert into TagType (tagid, tagtype) values
(1, 'Western'),
(2, 'Singaporean'),
(3, 'Chinese'),
(4, 'Thai'),
(5, 'Indian'),
(6, 'Halal'),
(7, 'Spicy');

insert into Tags (foodid, tagid) values
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(7, 7),
(8, 1),
(9, 5),
(10, 7);


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

insert into Promotion(promoid, rid, discount) values
(1, 1, 30),
(2, 2, 45);