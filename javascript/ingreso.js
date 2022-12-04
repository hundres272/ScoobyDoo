function enviarDatos(){
    var datos = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    if (datos.email!=="" && datos.password!=="") {
        fetch('https://harry.alwaysdata.net/ingreso',{
        // fetch('http://localhost:8000/ingreso',{
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
                console.log(res2.token);
                localStorage.setItem("x-access-token",res2.token);
                window.location.href = "indexSeriesAll.html";
            }else{
                document.getElementById("error").innerText = res2.status;
            }
        })
    }
}

document.addEventListener('keyup',(e)=>{
    if (e.code === "Enter") {
        enviarDatos();
    }
})