const express = require("express")
const app = express()
app.use(express.json())

app.post("/", (req, res) => {
    log(req.body.num)
    //res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({"success":true}))
})

app.listen(8080, 'localhost',  () => console.log("Listening on port 8080"))


function log(num) {
    const message=  `User input is ${num} the sqr it ${num*num}`
    console.log(  `${Date()} : ${message}` )
}