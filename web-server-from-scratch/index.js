const app = require("express")()

app.get("/", (req, res) => {

    res.sendFile(`${__dirname}/index.html`)
})

app.get("/sup", (req,res) => {
    res.statusCode = 418;
    res.send("Hello!");
})

app.listen(8080, ()=>console.log("SUP I'm listening yes sir. what do you want"))