//paste this in your browser console



const token = ""// your token we showed how you get it 
//Schema introspection 
fetch("https://api.github.com/graphql",
      {
       method: "GET",
       headers: {
            "Authorization" : `Token ${token}`
       }
}

).then(a=>a.json()).then(console.log)


//Query Repository 
q = `{
    repository (name: "freecodecamp", owner: "freecodecamp") {
         name
         forkCount
     }

}`


fetch("https://api.github.com/graphql",
      {
       method: "POST",
       headers: {
            "Authorization" : `Token ${token}`
       },
       body: JSON.stringify({ query: q })
}

).then(a=>a.json()).then(console.log)
