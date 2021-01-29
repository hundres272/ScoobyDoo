function enviarDatos(){
    var datos = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    if (datos.email!=="" && datos.password!=="") {
        fetch('https://scoobyapphundres.herokuapp.com/ingreso',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => {
            if(res2.status==='Usuario encontrado'){
                localStorage.setItem("email",res2.email);
                location.href = "index.html";
            }else{
                document.getElementById("error").innerText = res2.status;
            }
        })
    }
}