create table grades (id serial, g int);
-- create an index to speed up count queries (I missed this on the video)
create index g_idx on (g);
insert into grades (g) select random()*100 from generate_series(1,10000000);

