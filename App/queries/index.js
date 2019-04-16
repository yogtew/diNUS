module.exports = {
    getRestaurantById: "select * from restaurant where rid = $1",
    getTagTypes: "select * from TagType",
    getUserById: "select * from customer where custid = $1",
    getFoodPreferences: "select * from FoodPreferences where custid = $1",
    getReservations: 'select Restaurant.rname as "Restaurant Name", to_char(Reserves.restime, \'DD Mon HH12:MI am\') as "Time", resid FROM Reserves natural join Restaurant where Reserves.custid = $1',
    getCombinedFoodPreferences: "select T.tagid, T.tagtype, custid is not null as checked from TagType T left join (select * from FoodPreferences where custid = $1) F on F.tagid = T.tagid;",
    getCombinedLocPreferences: "select L.location, custid is not null as checked from Locations L left join (select * from LocationPreferences where custid = $1) P on P.plocation = L.location;",
    getLocationPreferences: "select * from LocationPreferences where custid = $1",
    clearFoodPrefsForUser: "delete from FoodPreferences where custid = $1",
    clearLocPrefsForUser: "delete from LocationPreferences where custid = $1",
    setFoodPrefsForUser: "insert into FoodPreferences(custid, tagid) values ",
    setLocPrefsForUser: "insert into LocationPreferences(custid, plocation) values ",
    getAvgReservations: "with ReservationData as (select B.rname as resName, cast(extract(month from A.restime) as int) as nameOfMonth, cast(count(*) as int) as numOfReservations from reserves A natural join restaurant B where rid = $1 group by (extract(month from A.restime), B.rid)) select RD.resName, RD.nameOfMonth, Avg(RD.numOfReservations) over W as avgReservations from ReservationData RD window W as(partition by RD.resName order by RD.nameOfMonth rows 2 preceding)",
    checkIfUserHasCardNo: "select 1 from PaymentMode where custid = $1",
    updateCardNoForUser: "update PaymentMode set cardid = $1 where custid = $2",
    insertCardNoForUser: "insert into PaymentMode values ($1, $2)",
    getCardNo: 'select cardid from PaymentMode where PaymentMode.custid=$1',        //card no is $1
    getPromotions: 'SELECT p.promoid as "Promo Number", r.rname as "Restaurant Name", p.discount as "Discount (%)" FROM promotion p inner join restaurant r on p.rid = r.rid',
    browseAll: 'SELECT distinct rname as "Name", rLocation as "Location", rRating as "Rating", rid FROM restaurant r',
    browseBasedonUserPreference: 'with RestaurantMenu as (select r.rid, r.rname, r.rrating, r.rlocation, m.foodid from Restaurant r inner join Menu m on r.rid = m.rid), ' +
                                         'RestaurantMenuTags as (select rm.rid, rm.rname, rm.rrating, rm.rlocation, rm.foodid, t.tagid from RestaurantMenu rm inner join Tags t on rm.foodid = t.foodid), ' +
                                         'RestaurantMenuTagsTagType as (select rmt.rid, rmt.rname, rmt.rrating, rmt.rlocation, rmt.foodid, rmt.tagid, tt.tagtype from RestaurantMenuTags rmt inner join TagType tt on rmt.tagid = tt.tagid), ' +
                                         'RestaurantTagTypeCount as (select rid, rname, rlocation, tagtype, count(*) from RestaurantMenuTagsTagType group by rid, rname, rlocation, tagtype order by count(*) desc), ' +
                                         'RestaurantFilteredForLocation as (select * from RestaurantTagTypeCount a where a.rlocation in (select plocation from LocationPreferences where custid=$1)), ' +
                                         'CustFoodPreference as (select custid, fp.tagid, tagtype from FoodPreferences fp inner join TagType tt on (fp.custid=$1 and fp.tagid = tt.tagid))' +
                                         'select rname as "Name", rlocation as "Location", tagtype as "Tag", count as "No. of Items" from RestaurantFilteredForLocation b where b.tagtype  in (select tagtype from CustFoodPreference where custid=$1)'
}
