delete from PaymentMode cascade;
delete FROM LocationPreferences cascade;
delete FROM FoodPreferences cascade;
delete from Promotion cascade;
delete from OpeningHours cascade;
delete from ReviewLikes cascade;
delete FROM Reviews cascade;
delete FROM Reserves cascade;
delete FROM Customer cascade;
delete from Menu cascade;
delete from Tags cascade;
delete from TagType cascade;
delete from Food cascade;
delete FROM RTable cascade;
delete FROM Restaurant cascade;
delete from Locations cascade;

insert into Locations (location) VALUES
    ('North'),
    ('South'),
    ('East'),
    ('West'),
    ('Central');

insert into Customer (custid, custname, phone, points, username, pw) values
(default, 'Alice Tan', 81234567, 0, 'aliceinwonderland', 'alicetrox123'),
(default, 'Bernard Lee', 98512383, 0, 'b', '1'),
(default, 'Charles Wong', 82347632, 0, 'smileyman', 'smileymaneats123!'),
(default, 'Skye Stark', 86614219, 114, 'skye48', '54091'),
(default, 'Marques Moore', 93223996, 193, 'marques68', '28112'),
(default, 'Aydin Garrison', 80944612, 103, 'aydin4', '91763'),
(default, 'Madison Davis', 92773200, 141, 'madison2', '44978'),
(default, 'King Mcmahon', 95321247, 45, 'king34', '148366'),
(default, 'Hezekiah Scott', 98947026, 141, 'hezekiah72', '163841'),
(default, 'Kathryn Cross', 86443063, 86, 'kathryn9', '97663'),
(default, 'Aidan Hernandez', 95072853, 71, 'aidan38', '137024'),
(default, 'Justus Lowe', 87012495, 37, 'justus12', '86447'),
(default, 'Sanaa Serrano', 89869567, 154, 'sanaa5', '107946'),
(default, 'Arely Zuniga', 83467234, 7, 'arely21', '152584'),
(default, 'Elle Quinn', 85520505, 159, 'elle79', '147504'),
(default, 'Yaretzi Morse', 89802967, 183, 'yaretzi1', '139499'),
(default, 'Dayami Preston', 80237168, 73, 'dayami83', '75249'),
(default, 'Marcos Mckee', 85786413, 73, 'marcos92', '134077'),
(default, 'Marvin Henry', 88989200, 80, 'marvin85', '87165'),
(default, 'Adalyn Park', 90279334, 34, 'adalyn43', '58845'),
(default, 'Leila Frank', 83752503, 75, 'leila95', '102025'),
(default, 'Ainsley Vazquez', 85729686, 144, 'ainsley84', '74479'),
(default, 'Harley Villa', 81323033, 195, 'harley33', '122815');

insert into PaymentMode(custid, cardid) values
(1, '4249608075505230'),
(2, '1111111111111112'),
(3, '3494274673589607'),
(4, '2241934993541458'),
(5, '3146473049352559'),
(6, '4350773800657797'),
(7, '5180439148347532'),
(8, '4310312454749584'),
(9, '5749903053392569'),
(10, '4383807559100821'),
(11, '1723433554656601'),
(12, '4575942947379097'),
(13, '1836609790497286'),
(14, '9795211157346621'),
(15, '9734667857813030'),
(16, '6908589735248908'),
(17, '1556761163334255'),
(18, '1514651960695513'),
(19, '4559917621502849'),
(20, '5335773088006830'),
(21, '8513957823758297'),
(22, '1357159583783902'),
(23, '4789624568569524');


--non-franchise restaurant
insert into Restaurant(rid, rname, rDesc, rRating, rLocation) values
(1, 'Dining Hall', 'Come eat at NUS Dining Halls for a delicious home-cooked meal!', 8, 'Central'),
(2, 'YIH Thai','Thai food at Yusof Ishak House', 2, 'South'),
(3, 'Ameens', 'Indian foood', 8, 'North'),
(9, 'YIH Chinese', 'YIH Chinese Stall', 6, 'South'),
(10, 'Tea Party', 'Pasta at University Sports Centre', 10, 'South'),
(11, 'Biz Western', 'The uncle takes orders real quick.', 7, 'South'),
(12, 'Deck Mala', 'Spicy', 7, 'South');

insert into Franchise(franchiseid, franchiseName) values
(1, 'McDonalds'),
(2, 'KFC'),
(3, 'Hot Tomato'),
(4, 'S11'),
(5, 'Pepper Lunch');

--franchise restaurant
insert into Restaurant(rid, franchiseid, rname, rDesc, rRating, rLocation) values
(4, 1, 'McDonalds North', 'get macs in the north', 7, 'North' ),
(5, 1, 'McDonalds South', 'get macs in the south', 8, 'South' ),
(6, 1, 'McDonalds West', 'get macs in the west', 5, 'West' ),
(7, 2, 'KFC Central', 'get kfc in the central', 3, 'Central' ),
(8, 2, 'KFC South', 'get kfc in the south', 5, 'South' ),
(13, 2, 'KFC North', 'get kfc in the north', 6, 'North' ),
(14, 2, 'KFC East', 'get kfc in the east', 8, 'East' );

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
(3, 6, '0800', '0300'),
(7, 1, '0600', '2200'),
(7, 2, '0600', '2200'),
(7, 3, '0600', '2200'),
(7, 4, '0600', '2200'),
(7, 5, '0600', '2200'),
(7, 6, '0600', '2330'),
(7, 0, '0600', '2330'),
(8, 1, '0600', '2200'),
(8, 2, '0600', '2200'),
(8, 3, '0600', '2200'),
(8, 4, '0600', '2200'),
(8, 5, '0600', '2200'),
(8, 6, '0600', '2330'),
(8, 0, '0600', '2330'),
(9, 1, '0600', '2200'),
(9, 2, '0600', '2200'),
(9, 3, '0600', '2200'),
(9, 4, '0600', '2200'),
(9, 5, '0600', '2200'),
(9, 6, '0600', '2330'),
(9, 0, '0600', '2330'),
(10, 1, '0600', '2200'),
(10, 2, '0600', '2200'),
(10, 3, '0600', '2200'),
(10, 4, '0600', '2200'),
(10, 5, '0600', '2200'),
(10, 6, '0600', '2330'),
(10, 0, '0600', '2330');

insert into RTable(tableid, numSeats, rid) values
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
(5, 10,3),
(1, 4, 4),
(1, 4, 5),
(1, 4, 6),
(1, 2, 7),
(2, 2, 7),
(1, 4, 8),
(2, 4, 8),
(1, 4, 9),
(2, 4, 9),
(1, 4, 10),
(2, 4, 10);



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
(12, 'Cheese Fries'),
(13, 'Pinky Pasta'),
(14, 'Bacon Aglio'),
(15, 'Mushroom Aglio'),
(16, 'Aglio Olio'),
(17, 'Carbonara'),
(18, 'Chicken Chop'),
(19, 'Chicken Burger'),
(20, 'Fish and Chips'),
(21, 'Fish Burger'),
(22, 'Mala Set 1'),
(23, 'Mala Set 2'),
(24, 'Mala Set 3'),
(25, 'Ban Mian'),
(26, 'You Mian'),
(27, 'Ja Jiang Mian'),
(28, 'Dumpling Soup');

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
(12, 6),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(15, 7),
(16, 7),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(18, 6),
(19, 6),
(20, 6),
(21, 6),
(22, 4),
(23, 4),
(24, 4),
(23, 6),
(24, 7),
(25, 4),
(26, 4),
(27, 4),
(28, 4),
(28, 7);

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
(3, 12, 1),
(9, 25, 3),
(9, 26, 3),
(9, 27, 4),
(9, 28, 4),
(10, 13, 6),
(10, 14, 4),
(10, 15, 4),
(10, 16, 4),
(10, 17, 5),
(11, 18, 3),
(11, 19, 2),
(11, 20, 4),
(11, 21, 2),
(12, 22, 5),
(12, 23, 4),
(12, 24, 3);

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

-- both  tables are booked on '2019-04-24 18:30' at KFC Central
insert into Reserves(resid, cardid, restime, respax, tableid, rid, custid) values
(DEFAULT, '4249608075505230', '2019-04-24 18:00', 1, 1, 7, 2),
(DEFAULT, '1111111111111112', '2019-04-24 18:30', 1, 1, 7, 1);
