const app = require("express")()

let logins = {}

app.get("/", (req,res)=>{
   //res.setHeader("Cache-Control","public, max-age=86400, no-transform")
   
   const etag= req.headers["if-none-match"];
   //check if there is a cookie, get the user
   if (req.headers.cookie)
   {
        const user = req.headers.cookie.split("=")[1];
        createUserfromEtag(etag,user)
   }   
   else
   {
        //there is no cookie, recreate the zombie cookie
        const user = getUserfromEtag(etag) 
        //recreate the cookie when we find a user 
        if (user) {
            res.setHeader("set-cookie", [`user=${user}`])
        }
   }

   console.log(etag)
   res.sendFile(`${__dirname}/index.html`)
})

app.get("/login", (req,res) =>{
    const user = req.query.user;
    res.setHeader("set-cookie", [`user=${user}`])
    res.send("set");
})

function createUserfromEtag(etag,user) {
    logins[etag] = user;
}
function getUserfromEtag(etag){
    return logins[etag]
}
app.listen(8080, ()=>console.log("listening to 8080"))