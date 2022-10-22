docker build . -t nhttpd
docker create network backend --subnet 10.0.0.0/24
docker create network frontend --subnet 10.0.1.0/24

docker run --name s1 --network backend --cap-add=NET_ADMIN -d nhttpd
docker run --name s2 --network frontend --cap-add=NET_ADMIN -d nhttpd
//add it on s2
ip route add 10.0.0.0/24 via 10.0.1.3
//add it on s1
ip route add 10.0.1.0/24 via 10.0.0.3
