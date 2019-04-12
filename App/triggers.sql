drop trigger if exists check_reservation_timing on reserves;
drop trigger if exists increment_loyalty_points on reserves;
drop trigger if exists decrement_loyalty_points on reserves;
drop trigger if exists decrement_loyalty_points on promotion;
drop trigger if exists check_valid_promotion on promotion;


create or replace function check_reservation_timing()
returns trigger as
$$
declare tableidavail integer;
begin
	select rt.tableid into tableidavail
	from rtable rt
	where rt.rid = new.rid
	and rt.numSeats >= new.respax
	and ((rt.rid not in(select res1.rid from Reserves res1))
	or rt.tableid not in(
	select distinct res.tableid
	from reserves res
	where (res.restime <= new.restime
	and cast(res.restime as timestamp) + interval '1h' > new.restime)
	or (res.restime >  new.restime
	and cast(res.restime as timestamp) - interval '1h' <= new.restime)
	and res.rid = new.rid
	))
	limit 1;
if tableidavail is null then
	raise exception 'Booking is already full.';
	return null;
else
	return (new.resid, new.cardid, new.restime, new.respax, tableidavail, new.rid, new.custid);
	end if;
end;
	$$
language plpgsql;


create trigger check_reservation_timing
before insert or update
on reserves
for each row
execute procedure check_reservation_timing();


create or replace function increment_loyalty_points()
returns trigger as
$$
begin
update Customer
SET points = points + 10
where  custid = new.custid;
return old;
end;
$$
language plpgsql;


create trigger increment_loyalty_points
after insert
on reserves
for each row
execute procedure increment_loyalty_points();


create or replace function decrement_loyalty_points()
returns trigger as
$$
begin
update Customer
SET points = points - 10
where custid = old.custid;
return old;
end;
$$
language plpgsql;

create trigger decrement_loyalty_points
after delete
on reserves
for each row
execute procedure decrement_loyalty_points();

/*
create trigger decrement_loyalty_points
after delete
on promotion
for each row
execute procedure decrement_loyalty_points();
*/

create or replace function check_valid_promotion()
returns trigger as
$$
declare present integer;
begin
	select 1 into present
	from Reserves res
	where res.rid = old.rid
	and res.restime > now();
if present is null then
	raise exception 'You have not made a reservation, you cannot claim this promotion';
end if;
return old;
end;
	$$
language plpgsql;


create trigger check_valid_promotion
before delete
on promotion
for each row
execute procedure check_valid_promotion();




