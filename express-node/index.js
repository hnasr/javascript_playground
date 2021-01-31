const express = require("express");
const app = express();
app.use(express.text());

app.get("/", (_,res)=> res.sendFile(__dirname + "/index.html"));
app.post("/", (req, res) => {
    
    console.log(req.query)
    res.sendStatus(204)
    //const products = req.body;
    //console.log(`Got ${products.length} products from client`)
    //res.send({"result": `Got ${products.length} products from client`})
})

app.listen(8080);
console.log("Listening on 8080")