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
    setLocPrefsForUser: "insert into LocationPreferences(custid, plocation) values ",
    updateCardNoForUser: "update PaymentMode set cardid=$1 where custid=$2",
    getCardNo: 'select cardid from PaymentMode where PaymentMode.custid=$1'
}
