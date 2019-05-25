const app = require("express")()
console.log(process.argv[2])
 
const port = process.argv[2] || 8080
console.log(`port is ${port}`)


app.get ("/img", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Set-Cookie", [`secret=yougotacookiefromanimage;`,`laxedcookie=test; SameSite=Lax`]);
    res.sendFile(`${__dirname}/img.png`)})

app.get ("/r1", (req, res) => {

    res.send(`client sent me these cookies:  ${req.headers.cookie}`);

})


app.get ("/r2", (req, res) => {

    res.send(`client sent me these cookies:  ${req.headers.cookie}`);

})



app.get ("/index", (req, res) => {
    
    res.setHeader("Set-Cookie", [`cookiefromserver=2`]);
    res.sendFile(`${__dirname}/index.html`)
    //res.send(`client sent me these cookies:  ${req.headers.cookie}`);

})
app.get("/", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    
    //res.setHeader("Set-Cookie", [`hussein${port}=${port};`, `husseindomain${port}=${port}; domain=husseinmac.local`]);
   
    //res.setHeader("Set-Cookie", `husseinhidden=bitchplease; HttpOnly`);

    res.send(`serving you from ${port} ${req.headers.cookie}`);
})

app.post("/", (req,res) => {
    
    res.send(`posted with cookie ${req.headers.cookie}`);
})

app.listen(port, () =>console.log(`listen ${port}`))
