const app = require("express")();
const {Client} = require("pg");
const crypto = require("crypto");
const HashRing = require("hashring");
const hr = new HashRing();

hr.add("5432")
hr.add("5433")
hr.add("5434")

const clients = {
    "5432" : new Client ({
        "host": "husseinmac",
        "port": "5432",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres"
    }),
    "5433" : new Client ({
        "host": "husseinmac",
        "port": "5433",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres"
    }),
    "5434" : new Client ({
        "host": "husseinmac",
        "port": "5434",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres"
    })
}

connect();
async function connect() {
    await clients["5432"].connect();
    await clients["5433"].connect();
    await clients["5434"].connect();
}


app.get("/:urlId", async (req, res) => {
    //https://localhost:8081/fhy2h
    const urlId = req.params.urlId; //fhy2h
    const server = hr.get(urlId)
    const result = await clients[server].query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [urlId]);
   if (result.rowCount > 0) {
    res.send({
        "urlId": urlId,
        "url": result.rows[0],
        "server": server
    })
   }
   else
      res.sendStatus(404)
    
})

app.post("/", async (req, res) => {

    const url = req.query.url;
    //www.wikipedia.com/sharding
    //consistently hash this to get a port! 
    const hash = crypto.createHash("sha256").update(url).digest("base64")
    const urlId = hash.substr(0, 5);

    const server = hr.get(urlId)

    await clients[server].query("INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1,$2)", [url, urlId]);

    res.send({
        "urlId": urlId,
        "url": url,
        "server": server
    })
})

app.listen(8081, () => console.log("Listening 8081") )