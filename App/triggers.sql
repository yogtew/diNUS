drop trigger if exists reservation_timing_check on reserves;

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


create trigger reservation_timing_check
before insert or update
on reserves
for each row
execute procedure check_reservation_timing();
