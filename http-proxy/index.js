const app = require("express")()

app.get("/", (req, res)=> {
    
    if (req.host === "google.com")
        res.status(301).redirect("https://hnasr.github.io/")


    /*
    res.sendStatus(301)
    console.log(req);
    res.sendFile(`${__dirname}/${req.host}.html`)
    */
})


app.listen(8080, ()=>console.log("Proxy is listening on 8080"))