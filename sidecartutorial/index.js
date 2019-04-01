const fetch = require("node-fetch")

const num1 = 10 
const num2 = 20
const num3 = 30
log(num1)
log(num2)
log(num3)

function log(num){

    const payLoad = {
        "num":num 
    }
    fetch("http://localhost:8080", 
    {
        method: "POST",
        headers : {
            "content-type": "application/json"
        },
        body: JSON.stringify(payLoad)
    }
    )
    .then(a => a.json())
    .then(console.log)
    .catch(console.error)
}

