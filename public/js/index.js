const getProducts = async () => {
    let response = await fetch('http://localhost:3000/products')
    let products = await response.json();
    return products;
}

const createProductBox = (name, age, cost, id, buff, contact) => {
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

    box.appendChild(createInfoElement("Name", name));

    box.appendChild(createInfoElement("Age", age));
 
    box.appendChild(createInfoElement("Cost", cost));

    const button = document.createElement('button');
    button.className = "center btn btn-primary";
    button.innerText = "Buy";
    button.setAttribute('data', id);
    button.setAttribute('onclick', 'Buy(event)');
    box.appendChild(button);

    box.appendChild(createInfoElement("Contact Owner", contact));
    return box;
}

const displayProducts = async () => {
    let myNode = document.querySelector('.products')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
    }
    const products = await getProducts();
    products.forEach(element => {
        const productBox = createProductBox(element.name, element.age, element.cost, element._id, element.image.data, element.owner.phone);
        document.querySelector('.products').appendChild(productBox);
    });
}

displayProducts();

const getTransactions = async () => {
    let response = await fetch('http://localhost:3000/users/orders')
    let orders = await response.json();
    console.log(orders);
    return orders;
}

const createTransactionBox = (name, cost, seller, contact) => {
    const box = document.createElement('div');
    box.className = "order";

    box.appendChild(createInfoElement("Name", name));

    box.appendChild(createInfoElement("Cost", cost));
   
    box.appendChild(createInfoElement("Seller", seller));
    box.appendChild(createInfoElement("Contact Owner", contact));
    return box;
}

const displayTransactions = async () => {
    let myNode = document.querySelector('.orders')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
    }
    const orders = await getTransactions();
    orders.forEach(element => {
        const orderBox = createTransactionBox(element.product.name, element.product.cost, element.product.owner.name, element.product.owner.phone)
        document.querySelector('.orders').appendChild(orderBox);
    });
}

displayTransactions();

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
        displayTransactions();
    }
}

const createInfoElement = (Title, value) => {
    const elem = document.createElement('div');
    elem.innerText = `${Title}: ${value}`
    return elem
}