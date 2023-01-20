//go to chat.openai.com 
//paste the following code in the console

document.body.removeChild(document.body.firstChild)

document.body.innerHTML = ` <table>
    <tr>
        <td><iframe style = 'width:600px;height:1200px' id = 'cf1' src = 'https://chat.openai.com/chat/36327d80-e9a4-4cd2-a4e7-4323cf4f05c8'></iframe></td>
        <td><iframe style = 'width:600px;height:1200px' id = 'cf2' src = 'https://chat.openai.com/chat/1aa8ab10-2e0a-4856-8d83-7b77a4471567'></iframe></td>
    </tr>
</table>`


//for for it to load
await new Promise(r => setTimeout(r, 10000));

 let f1 = document.getElementById("cf1")
let f2 = document.getElementById("cf2")


let c1t = f1.contentDocument.querySelector("textArea")
let c1b = f1.contentDocument.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent")[0]
 

let c2t = f2.contentDocument.querySelector("textArea")
let c2b = f2.contentDocument.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent")[0]
 

let r1 = f1.contentDocument.getElementsByClassName("w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]")
let r2 = f2.contentDocument.getElementsByClassName("w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]")
 
let q1 = ""
let q2 =""
async function chat (text) {

    c1t.value = text
    c1b.click();
    //wait for a while then read the response 
    await new Promise(r => setTimeout(r, 20000));
    let response = Array.from(r1[r1.length-1].children[0].children[1].children[0].children[0].children[0].children).at(-1).textContent

    if (response != q2)
        q1 = response;
    else
        q1 = "Ask me a random non-personal question."

    //now send the response to the other one. 
    c2t.value = "Answer this and then ask me a random question. " + q1 
    c2b.click()
    await new Promise(r => setTimeout(r, 20000));
    q2 = Array.from(r2[r2.length-1].children[0].children[1].children[0].children[0].children[0].children).at(-1).textContent
    setTimeout(()=> chat("Answer this then ask me a random non personal question: " +  q2) , 5000)

    
}

chat("ask me a random non personal question")



