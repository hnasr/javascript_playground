const fs = require("fs");

const employees = []

employees.push({
    "name": "Hussein",
    "salary": 1000,
    "id": 1001
})

const ahmed = {
    "name": "Ahmed",
    "salary": 9000,
    "id": 1002
}

employees.push(ahmed);

employees.push({
    "name": "Rick",
    "salary": 5000,
    "id": 1003
})

fs.writeFileSync("jsondata.json", JSON.stringify(employees));