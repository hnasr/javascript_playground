const app = require ("express")();

app.get("/isprime", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    const jsonResponse = isPrime(parseInt(req.query.number))
    res.send(jsonResponse)
} )

app.listen(8081, ()=>console.log("Listening on 8081") )

function isPrime(number) {
    let startTime = new Date();
    let endTime = new Date();
    let isPrime = true;
    for (let i = 3; i < number; i ++)
    {   
        //it is not a prime break the loop,
        // see how long it took
        if (number % i === 0) 
        {
            endTime = new Date();
            isPrime = false;
            break;
        }
    }

    if (isPrime) endTime = new Date();

    return {
        "number" : number,
        "isPrime": isPrime,
        "time": endTime.getTime() - startTime.getTime()
        }

}

/*

2367949 (16 ms)
43686389 (200 ms)
93686687 (500 ms)
936868033(4 seconds)
29355126551 (very long time)

*/
