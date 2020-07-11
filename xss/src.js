const btnAdd = document.getElementById("btnAdd")
btnAdd.addEventListener("click", e => postProduct(prompt("Enter Product Name")))

async function postProduct(name) {
    const olProducts = document.getElementById("olProducts")
    const res = await fetch("http://localhost:8080/products", {"method": "post", "headers": {"content-type": "application/json"}, "body": JSON.stringify({"name": name   }) });
    const a = await res.json();
    alert(JSON.stringify(a))
}

 
/*
async function loadProducts() {
    const olProducts = document.getElementById("olProducts")
    const res = await fetch("http://localhost:8080/products");
    const products = await res.json();
    products.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = p;
        olProducts.appendChild(li)
    })

}
*/