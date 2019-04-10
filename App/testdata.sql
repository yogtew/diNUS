-- Initialize database with test data

-- Load data for testcase 1
DELETE FROM LocationPreferences CASCADE;
DELETE FROM FoodPreferences CASCADE;
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
(1, 'Dining Hall', 8, 'Central'),
(2, 'YIH Thai', 2, 'South'),
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

insert into Food (foodid, foodname) values
(1, 'Halal Malay Veggie'),
(2, 'Halal Malay Non-Veggie'),
(3, 'Halal Indian Veggie'),
(4, 'Halal Indian Non-Veggie'),
(5, 'Non-Halal Chinese Veggie'),
(6, 'Non-Halal Chinese Non-Veggie'),
(7, 'Non-Halal Western Veggie'),
(8, 'Non-Halal Western Non-Veggie'),
(9, 'Thai Green Curry'),
(10, 'Thai Fried Rice'),
(11, 'Thai Tom Yum'),
(12, 'Cheese Fries');

insert into TagType (tagid, tagtype) values
(1, 'Western'),
(2, 'Malay'),
(3, 'Indian'),
(4, 'Chinese'),
(5, 'Thai'),
(6, 'Halal'),
(7, 'Vegetarian');

insert into Tags (foodid, tagid) values
(1, 6),
(1, 2),
(1, 7),
(2, 6),
(2, 2),
(3, 6),
(3, 3),
(3, 7),
(4, 6),
(4, 3),
(5, 4),
(5, 7),
(6, 4),
(7, 1),
(7, 7),
(8, 1),
(9, 5),
(10, 5),
(11, 5),
(12, 1),
(12, 6);

insert into Menu(rid, foodid, price) values
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(1, 6, 1),
(1, 7, 1),
(1, 8, 1),
(2, 9, 1),
(2, 10, 1),
(2, 11, 1),
(3, 12, 1);

insert into Promotion(promoid, rid, discount) values
(1, 1, 30),
(2, 2, 45);

insert into FoodPreferences (custid, tagid) values
(1, '1'),
(1, '5'),
(2, '2'),
(2, '3'),
(3, '3'),
(3, '4');

insert into LocationPreferences(custid, plocation) values
(1, 'Central'),
(1, 'North');