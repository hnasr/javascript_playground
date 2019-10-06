function isPrime(number, timeout=2000){
    const controller = new AbortController();
     
    setTimeout(()=> controller.abort(), timeout)
    fetch(`http://localhost:8081/isprime?number=${number}`,
          {"signal": controller.signal})
    .then(r=>r.json())
    .then(console.log)
    .catch(e=>console.log(e.message))
    ​
    }
    