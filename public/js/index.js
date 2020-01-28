const getProducts = async () => {
    let response = await fetch('http://localhost:3000/products')
    let products = await response.json();
    return products;
}

const createProductBox = (name, age, cost, id, buff) => {
    const box = document.createElement('div');
    box.className = "product";
    const imgElement = document.createElement('img');
    imgElement.style.width = "100px"
    // buffString = btoa(String.fromCharCode.apply(null, buff)); //This only works for small images
    buffString = btoa(new Uint8Array(buff).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    imgElement.src = "data:image/jpg;base64,"+buffString;
    box.appendChild(imgElement)
    const nameElement = document.createElement('div');
    nameElement.innerText = `Name: ${name}`
    box.appendChild(nameElement);
    const ageElement = document.createElement('div');
    ageElement.innerText = `Age: ${age}`
    box.appendChild(ageElement);
    const costElement = document.createElement('div');
    costElement.innerText = `Cost: ${cost}`
    box.appendChild(costElement);
    const button = document.createElement('button');
    button.className = "center btn btn-primary";
    button.innerText = "Buy";
    button.setAttribute('data', id);
    button.setAttribute('onclick', 'Buy(event)');
    box.appendChild(button);
    return box;
}

const displayProducts = async () => {
    let myNode = document.querySelector('.products')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
    }
    const products = await getProducts();
    products.forEach(element => {
        const productBox = createProductBox(element.name, element.age, element.cost, element._id, element.image.data);
        document.querySelector('.products').appendChild(productBox);
    });
}

displayProducts();

const getOrders = async () => {
    let response = await fetch('http://localhost:3000/users/orders')
    let orders = await response.json();
    return orders;
}

const createOrderBox = (name, cost, seller) => {
    const box = document.createElement('div');
    box.className = "order";
    const nameElement = document.createElement('div');
    nameElement.innerText = `Name: ${name}`
    box.appendChild(nameElement);
    const costElement = document.createElement('div');
    costElement.innerText = `Cost: ${cost}`
    box.appendChild(costElement);
    const sellerElement = document.createElement('div');
    sellerElement.innerText = `Seller: ${seller}`
    box.appendChild(sellerElement);
    return box;
}

const displayOrders = async () => {
    let myNode = document.querySelector('.orders')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
    }
    const orders = await getOrders();
    orders.forEach(element => {
        const orderBox = createOrderBox(element.itemName, element.cost, element.sellerName)
        document.querySelector('.orders').appendChild(orderBox);
    });
}

displayOrders();

const getProfile = async () => {
    let response = await fetch('http://localhost:3000/users/profile');
    if(response.status == 200){
        let profile = await response.json();
        return profile;
    }
}

const displayProfile = async () => {
    if(await getProfile()){
        profile = await getProfile();
        document.getElementById('points').innerText = profile.points;
        document.getElementById('username').innerText = profile.name;
    }
}

displayProfile();

const Buy = async (event) => {
    let id = event.toElement.attributes.data.value;
    let response = await fetch('http://localhost:3000/products/'+id);
    if(response.status == 501){
        alert("Points Insufficient");
    }else if(response.status == 401){
        alert("You are not logged in")
    }else if(response.status == 405){
        alert("Hold on!,You are buying your own product");
    }
    else{
        displayProducts();
        displayProfile();
        displayOrders();
    }
}