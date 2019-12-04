const express = require("express");
const app = express();

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.get("/img/:id", (req, res)=> {
    const id = req.params.id;
    res.sendFile(`${__dirname}/img/${id}`)
})

app.post("/", (req, res) => {
    console.log(`id ${req.query.id} timespent ${req.query.timespent} ms`)
    res.sendStatus(204);
})
app.listen(8080, ()=>console.log("Listening on 8080"))