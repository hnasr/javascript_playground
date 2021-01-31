const app = require("express")()

app.post("/", (req,res) =>{

    const cookie = req.headers.cookie;
    if (cookie)
        res.sendFile(`${__dirname}/cookie.png`)
    else{
        res.sendStatus(403);
        res.end();
    }
})
app.post("/login", (req, res) => {
    //const cookie = "user=hussein; samesite=strict; secure";
    const cookie = "user=hussein; samesite=lax; secure";
    //const cookie = "user=hussein; samesite=none; secure";
    //const cookie = "user=hussein;";

    res.setHeader("set-cookie", [cookie])
    res.send("ok")
})


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/img", (req, res) => {
    const cookie = req.headers.cookie;
    if (cookie)
        res.sendFile(`${__dirname}/cookie.png`)
    else{
        res.sendStatus(403);
        res.end();
    }
})
  
app.listen(8080, ()=>console.log("listening on port 8080"))