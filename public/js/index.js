const getProducts = async () => {
    let response = await fetch('http://localhost:3000/products')
    let products = await response.json();
    return products;
}

const createProductBox = (name, age, cost, id) => {
    const box = document.createElement('div');
    box.className = "product";
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
    const products = await getProducts();
    products.forEach(element => {
        const productBox = createProductBox(element.name, element.age, element.cost, element._id)
        document.querySelector('.products').appendChild(productBox);
    });
}

displayProducts();

const getPoints = async () => {
    let response = await fetch('http://localhost:3000/users/points');
    if(response.status == 200){
        let points = await response.text();
        return points;
    }
}

const displayPoints = async () => {
    if(await getPoints()) document.getElementById('points').innerText = await getPoints();
}

displayPoints();

const Buy = async (event) => {
    let id = event.toElement.attributes.data.value;
    let response = await fetch('http://localhost:3000/products/'+id);
    if(response.status == 501){
        alert("Points Insufficient");
    }else if(response.status == 401){
        alert("You are not logged in")
    }
    else{
        let text = await response.text();
        document.getElementById('points').textContent = text;
        event.path[1].parentNode.removeChild(event.path[1]);
    }
}