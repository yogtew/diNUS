module.exports = {
    getTagTypes: "select * from TagType",
    getUserById: "select * from customer where custid = $1",
    getFoodPreferences: "select * from FoodPreferences where custid = $1",
    getReservations: 'select Restaurant.rname as "Restaurant Name", to_char(Reserves.restime, \'HH12:MI\') as "Time", resid FROM Reserves natural join Restaurant where Reserves.custid = $1',
    getCombinedFoodPreferences: "select T.tagid, T.tagtype, custid is not null as checked from TagType T left join (select * from FoodPreferences where custid = $1) F on F.tagid = T.tagid;",
    getCombinedLocPreferences: "select L.location, custid is not null as checked from Locations L left join (select * from LocationPreferences where custid = $1) P on P.plocation = L.location;",
    getLocationPreferences: "select * from LocationPreferences where custid = $1",
    clearFoodPrefsForUser: "delete from FoodPreferences where custid = $1",
    clearLocPrefsForUser: "delete from LocationPreferences where custid = $1",
    setFoodPrefsForUser: "insert into FoodPreferences(custid, tagid) values ",
    setLocPrefsForUser: "insert into LocationPreferences(custid, plocation) values "
    getAvgReservations = "with ReservationData as (select B.rname as resName, cast(extract(month from A.restime) as int) as nameOfMonth, count(*) as numOfReservations from reserves A natural join restaurant B where rid = $1 group by (extract(month from A.restime), B.rid)) select RD.resName, RD.nameOfMonth, Avg(RD.numOfReservations) over W as avgReservations from ReservationData RD window W as(partition by RD.resName order by RD.nameOfMonth rows 2 preceding)"
}
