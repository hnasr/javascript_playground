const app = require("express")()

app.get("/", (req, res) => {

    res.sendFile(`${__dirname}/index.html`);

})

app.get("/login", (req, res)=> {
    
})