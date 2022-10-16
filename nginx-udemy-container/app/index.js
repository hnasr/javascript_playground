const express = require("express");
const app = express();
const os = require("os")
const hostname = os.hostname();


app.get("/", (req, res) => res.send("Hello from " + hostname ) ) ;
app.listen(8080, () => console.log("listening on port 8080 on " + hostname));

