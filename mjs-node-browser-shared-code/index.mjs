import { AwesomeClass } from "./github.mjs"
const a = new AwesomeClass();

a.load().then(a=>a.json()).then(console.log)