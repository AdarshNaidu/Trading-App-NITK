function isValid(form)  {
    if(form.password.value.trim().toLowerCase().includes('password')){
        alert("Password Cannot contain 'password'");
        return false;
    };
    return true;
}