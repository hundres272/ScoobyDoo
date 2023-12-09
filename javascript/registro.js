function enviarDatos(){
    var datos = {
        "name": document.getElementById("name").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    if (datos.email!=="" && datos.password!=="" && datos.name!=="") {
        fetch('https://harry.alwaysdata.net/registro',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("x-access-token")
            }
        })
        .then(res => res.json())
        .then(res2 => {
            if(res2.status === 'Usuario guardado'){
                window.location.href = "indexSeriesAll.html";
            }else{
                document.getElementById("error").innerText = res2.status;
            }
        })
    }
}

function home(){
    location.href = 'indexSeriesAll.html';
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("ttp");
    location.href = "ingreso.html";
}

document.addEventListener('keyup',(e)=>{
    if (e.code === "Enter") {
        enviarDatos();
    }
})