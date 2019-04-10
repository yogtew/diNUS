-- Initialize database with test data

-- Load data for testcase 1

DELETE FROM Reviews CASCADE;
DELETE FROM Reserves CASCADE;
DELETE FROM Customers CASCADE;
DELETE FROM CuisineTags CASCADE;
DELETE FROM Restaurants CASCADE;
DELETE FROM RTable CASCADE;
DELETE FROM Food CASCADE;
DELETE FROM Preferences CASCADE;


INSERT INTO Customers (custid, name, phone, points, username, password) VALUES
(1, 'Alice Tan', 81234567, 0, 'alice123', 'password'),
(2, 'Bernard Lee', 98512383, 0, 'b.lee', 'hunter2'),
(3, 'Charles Wong', 82347632, 0, 'charleswongxd', 'donttellu');

INSERT INTO Restaurants(rid, rname, rRating, rLocation, openTime, closeTime) VALUES
(1, 'McDolans', 8, 'Buona Vista', '0600', '2200'),
(2, 'Dining Hall', 2, 'Riche Vue', '0700', '2130'),
(3, 'Ameens', 8, 'Supper Stretch', '0800', '0300');

INSERT INTO Reviews(rid, review, custid, rating) VALUES
(1, 'Very good', 1, 7),
(2, 'Food too salty', 1, 3),
(3, 'Expensive', 2, 5);

INSERT INTO RTable(tableid, rid) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3);

--INSERT INTO Reserves(resid, restime, tableid, rid, custid) VALUES
--(1, '2019-03-19 18:00:00', 1, 1, 1);

INSERT INTO Food(foodname, price, rid) VALUES
('McWangs', 4, 1),
('McGreedles', 5, 1),
('Asian Stall', 0, 2),
('Malay Stall', 0, 2),
('Cheese Fries S', 4, 3),
('Cheese Fries M', 5, 3),
('Cheese Fries L', 6, 3);

INSERT INTO CuisineTags(rid, tag) VALUES
(1, 'Western'),
(1, 'Fast Food'),
(2, 'Asian'),
(2, 'Malay'),
(2, 'Indian'),
(2, 'Affordable'),
(3, 'Supper'),
(3, 'Halal'),
(3, 'Healthy');
