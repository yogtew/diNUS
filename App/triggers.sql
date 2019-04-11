drop trigger if exists check_reservation_timing on reserves;
drop trigger if exists increment_loyalty_points on reserves;
drop trigger if exists decrement_loyalty_points on reserves;


create or replace function check_reservation_timing()
returns trigger as
$$
declare tableidavail integer;
begin
	select rt.tableid into tableidavail
	from rtable rt
	where rt.rid = new.rid
	and rt.numSeats >= new.respax
	and rt.tableid not in(
	select distinct r.tableid
	from reserves r
	where (r.restime <= new.restime
	and cast(r.restime as timestamp) + interval '1h' > new.restime)
	or (r.restime >  new.restime
	and cast(r.restime as timestamp) - interval '1h' <= new.restime)
	and r.rid = new.rid
	)
	limit 1;
if tableidavail is null then
	raise exception 'Booking is already full';
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


/*
create or replace function decrement_loyalty_points()
returns trigger as
$$
update
update Customer
SET column1 = value1,
where
condition;

end;
$$
language plpgsql;


create trigger decrement_loyalty_points
before delete
on reserves
for each row
execute procedure decrement_loyalty_points();
*/
