const app = require("express")();
const fetch = require("node-fetch")

app.get("/*", (req, res) => {
    fetch(req.url).then(a=>a.text()).then(a=>{
      a = "<h1>My proxy saw this, I know what you are up to.</h1>" + a;
        res.send(a)
    });
    console.log("hey someone made request")
     
})

app.listen(8080, ()=> 
console.log("Listening on port 8080"))
