create table grades (id serial, g int);
insert into grades (g) select random()*100 from generate_series(1,10000000);

