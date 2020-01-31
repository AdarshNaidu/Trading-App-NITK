function isValid(form){
    if(form.name.value.trim() == ""){
        alert("Name cannot contain only spaces");
        return false;
    }
    if(form.password.value.trim().toLowerCase().includes('password')){
        alert("Password Cannot contain 'password'");
        return false;
    }
    return true;
}