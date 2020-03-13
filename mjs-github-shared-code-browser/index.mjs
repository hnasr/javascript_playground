import { GitHub } from "./github.mjs";

async function run (){

    try {
        const github = new GitHub();
        const res = await github.emojis();
        const j = await res.json();
        Object.keys(j).forEach(k => console.log (`${k} : ${j[k]}`))
    }
    catch(e)
    {
        console.error(e)
    }
}

run();