function avanzar(){
    var scrl = document.getElementById("series-row").scrollLeft;
    document.getElementById("series-row").scrollLeft = parseInt(scrl)+parseInt(162);
}

function registrarUsuarioNuevo(){
    location.href = 'registro.html';
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("ttp");
    location.href = "ingreso.html";
}

function load() {
    const botonRegistro = document.getElementById('btn-registro');
    const ttp = localStorage.getItem('ttp');
    if(ttp === null || ttp !== 'ffp') {
        botonRegistro.classList.add('invisible');
    }
}

document.addEventListener('load', load());