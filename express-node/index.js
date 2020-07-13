const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (_,res)=> res.send("test"));
app.post("/", (req, res) => {

    const products = req.body;
    console.log(`Got ${products.length} products from client`)
    res.send({"result": `Got ${products.length} products from client`})
})

app.listen(8080);
console.log("Listening on 8080")