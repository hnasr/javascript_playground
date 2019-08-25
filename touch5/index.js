const fs = require("fs");

exports.writehtml5public = writeHTML5;

function writeHTML5(){
    const html5 = fs.readFileSync(`${__dirname}/index.html`)
    const filename = process.argv[2]
    fs.writeFileSync(`${process.cwd()}/${filename}`, html5)

}

writeHTML5();