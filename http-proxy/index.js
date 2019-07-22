const app = require("express")()

app.get("/", (req, res)=> {

    console.log(req);
    res.sendFile(`${__dirname}/${req.host}.html`)
})


app.listen(8080, ()=>console.log("Proxy is listening on 8080"))