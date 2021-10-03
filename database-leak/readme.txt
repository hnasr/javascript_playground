postgres=# create table todos(id serial, todo text);
CREATE TABLE
docker run --name pg --publish 5432:5432 -e POSTGRES_PASSWORD=password postgres
docker exec -it pg psql -U postgres

postgres=# insert into todos (todo) values ('clean room');
INSERT 0 1
postgres=# insert into todos (todo) values ('clean fridge');
INSERT 0 1
postgres=# insert into todos (todo) values ('clean everything');
INSERT 0 1
postgres=# 
