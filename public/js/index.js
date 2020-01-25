const Buy = async (event) => {
    let id = event.toElement.attributes.data.value;
    // alert("You are going to buy the item number" + id + "By proceeding")
    let response = await fetch('http://localhost:3000/products/'+id);

    let text = await response.text();
    console.log(text);
    document.getElementById('points').textContent = text;
    event.path[1].parentNode.removeChild(event.path[1]);
}