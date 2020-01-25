const Update = async (event) => {
    let id = event.toElement.attributes.data.value;
    let value = event.toElement.previousElementSibling.value;

    let response = await fetch('http://localhost:3000/users/'+value+'/'+id)
    let result = await response.text();
    alert(result);
    event.toElement.previousElementSibling.previousElementSibling.innerHTML = value;
}