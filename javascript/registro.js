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
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => {
            if(res2){
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

document.addEventListener('keyup',(e)=>{
    if (e.code === "Enter") {
        enviarDatos();
    }
})