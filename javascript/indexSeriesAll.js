function avanzar(){
    console.log(document.getElementById("series-row").scrollLeft);
    var scrl = document.getElementById("series-row").scrollLeft;
    document.getElementById("series-row").scrollLeft = parseInt(scrl)+parseInt(162);
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    localStorage.removeItem("x-access-token");
    location.href = "ingreso.html";
}