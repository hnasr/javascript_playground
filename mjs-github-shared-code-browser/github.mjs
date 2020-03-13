export class GitHub {

    constructor () {

    }

    async getFetch() {
        try {
             const nodeFetch = await import ("node-fetch"); //require 
             return nodeFetch.default;
           }
        catch (ex){
                //browser 
            return fetch;

        }

    }

    async emojis() {

        const f = await this.getFetch();
        return f("https://api.github.com/emojis") ;
    }

}