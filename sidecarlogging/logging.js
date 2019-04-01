//my logging sidecar process
const express = require("express")
const app = express()
app.use(express.json())
/*
{
    num: 110
}
*/
app.post("/", (req, res) => {
    const num = req.body.num
    const message = `Hey your number squared is ${num*num}`
    console.log(message)
    res.send(JSON.stringify({success:true}))
})

app.listen(8080, () => console.log("Listening on port 8080"))