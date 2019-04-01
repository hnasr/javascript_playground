const fetch = require("node-fetch")

const num1 = 100
log(num1)

const num2 = 200
log(num2)

const num3 = 200
log(num3)

function log(num){
    const payLoad = {
        "num": num
    }

    fetch("http://localhost:8080",
    {
        method:"post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payLoad)
    })
    .then(a => a.json())
    .then(console.log)
    .catch(console.error)
    
}