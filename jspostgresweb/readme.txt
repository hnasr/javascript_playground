#spin up a postgres docker container 
docker run —name pg —publish 5432:5432 -e POSTGRES_PASSWORD=password postgres

