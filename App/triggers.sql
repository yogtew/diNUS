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
	raise exception 'You have not made a reservation for this restaurant, you cannot claim this promotion';
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