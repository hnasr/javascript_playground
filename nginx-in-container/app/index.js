const express = require("express");
const app = express();
const os = require("os");
const hostname = os.hostname();

app.get("/", (req, res) => res.send("hello from " + hostname));

app.listen(8080);
console.log("listening on 8080 on " + hostname)
