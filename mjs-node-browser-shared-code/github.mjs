export class AwesomeClass {

    constructor(url)
    {   

        this.url= "https://api.github.com";

    }

    load () { 

         return import ("node-fetch").then(nodeFetch => nodeFetch.default(this.url)).catch(e=> fetch(this.url))   

    } 
    getAwesome() {} 

}