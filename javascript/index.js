var posicion = 0;
var nombreSerie = "Scooby";
const video = document.getElementById('video');
const source = document.createElement('source');
const videos = [
    {
        id: '1',
        nombre: 'La leyenda del caballero negro',
    },
    {
        id: '2',
        nombre: 'Una pista para Scooby-Doo',
    },
    {
        id: '3',
        nombre: 'El Fantasma del Castillo',
    },
    {
        id: '4',
        nombre: 'El Fantasma de Ciudad de Oro',
    },
    {
        id: '5',
        nombre: 'El Señuelo',
    },
    {
        id: '6',
        nombre: 'Con mil demonios - Qué pasa aquí',
    },
    {
        id: '7',
        nombre: 'Jamás persigas a un hombre mono',
    },
    {
        id: '8',
        nombre: 'Falla divertida en los juegos mecánicos',
    },
    {
        id: '9',
        nombre: 'El teatro de los billetes falsos',
    },
    {
        id: '10',
        nombre: 'El caso del payaso Fantasma',
    },
    {
        id: '11',
        nombre: 'El castillo de Frankenstein',
    },
    {
        id: '12',
        nombre: 'Scooby-Doo y una momia también',
    },
    {
        id: '13',
        nombre: 'Cómo pescar una bruja',
    },{
        id: '14',
        nombre: 'Esfúmate Barco Fantasma',
    },{
        id: '15',
        nombre: 'El Fantasma del Aeropuerto Abandonado',
    },{
        id: '16',
        nombre: 'Una Noche de Espanto, Causa Quebranto',
    },{
        id: '17',
        nombre: 'El Fantasma de las Nieves',
    },{
        id: '18',
        nombre: 'El Espectro de Hyde',
    },{
        id: '19',
        nombre: 'La Máscara de Zen-Túo',
    },{
        id: '20',
        nombre: 'El Papel Misterioso',
    },{
        id: '21',
        nombre: 'La Noche de los Pies Helados',
    },{
        id: '22',
        nombre: 'La Leyenda del Decapitado',
    },{
        id: '23',
        nombre: 'La Aldea Encantada',
    },{
        id: '24',
        nombre: 'Quién Teme al Lobo Feroz',
    },{
        id: '25',
        nombre: 'No Juegues con un Fantasma',
    }
]

function obtenerURL(value){
    var url = "";
    const parseName = videos[value].nombre.split(" ");
    var nombreParseado = "";
    nombreParseado = videos[value].id + ".";
    for (let i = 0; i < parseName.length; i++) {
        nombreParseado = nombreParseado + '%20' + parseName[i];
    }
    url = `https://liveudenaredu-my.sharepoint.com/personal/hugoandres272_udenar_edu_co/Documents/Scooby/${nombreParseado}.mp4?App=OneDriveWebVideo`;
    return url;
}

function anteriorVideo(){
    if (posicion>0) {
        posicion--;
        videoActual();
        var aux = videoTieneVisualizacion();
        if (aux!==-1) {
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
        }
        enviarDatos();
    }
}

function siguienteVideo(){
    if (posicion<videos.length) {
        posicion++;
        videoActual();
        var aux = videoTieneVisualizacion();
        if (aux!==-1) {
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
        }
        enviarDatos();
    }
}

function tiempoDeVisualizacion(){
    var value = video.currentTime;
    var seconds = Math.floor(value % 60);
    var minutes = Math.floor((value/60) % 60);
}

function traerTiempo(){
    var tiempo = null;
    var data = {
        "email": localStorage.getItem("email"),
        "serie": nombreSerie
    };
    fetch(`https://scoobyapphundres.herokuapp.com/${nombreSerie}`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res2 => {
        console.log("datos traertiempo=");
        console.log(res2);
        if(res2.status!=='no encontrado'){
            localStorage.setItem("datosvideos", JSON.stringify(res2));
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            if(datosLocal!==null){
                posicion =  parseInt(datosLocal.datosSerieVideos.videoActSerie);
            }else{
                posicion = 0;
            }
            
            var aux = videoTieneVisualizacion();
            videoActual();
            if (aux!==-1) {
                video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
            }
        }
    })
}

function videoTieneVisualizacion(){
    var aux = -1;
    var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
    if(datosLocal!==null){
        for (let i = 0; i < datosLocal.datosSerieVideos.videos.length; i++) {
            if(parseInt(datosLocal.datosSerieVideos.videos[i].video) === parseInt(posicion)){
                return i;
            }
        }
    }
    return aux;
}

function videoActual(){
    document.getElementById("title").textContent = `${nombreSerie}`;
    document.getElementById("title-cap").textContent = `${videos[posicion].id}. ${videos[posicion].nombre} `;
    source.setAttribute('src', obtenerURL(posicion));
    video.appendChild(source);
    video.load();
    video.pause();
}

video.onpause = function(){
    enviarDatos();
}

document.addEventListener("load",traerTiempo());
function salir(){
    var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
    if(datosLocal.datos.videoActSerie!==null){
        enviarDatos();
    }
    return "Alerta";
};

function enviarDatos(){
    
    var data = {
        "email": localStorage.getItem("email"),
        "serie": nombreSerie,
        "datosSerieVideos": {
            "videoActSerie": posicion,
            "videos": llenarListaVideos()
        }
    };
    localStorage.setItem("datosvideos",JSON.stringify(data));
    console.log("data: enviardatos=")
    console.log(data);
    fetch(`https://scoobyapphundres.herokuapp.com/${nombreSerie}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res2 => console.log(res2))
}

function llenarListaVideos(){
    var aux = [];
    var localstorage = null;
    var value = video.currentTime;
    var seconds = Math.floor(value % 60);
    var minutes = Math.floor((value/60) % 60);

    localstorage = JSON.parse(localStorage.getItem("datosvideos"));
    if (localstorage===null) {
        aux.push({
            "video": posicion,
            "minuto": minutes,
            "segundos": seconds
        });
    }else{
        for (let i = 0; i < localstorage.datosSerieVideos.videos.length; i++) {
            if(localstorage.datosSerieVideos.videos[i].video !== posicion){
                aux.push(localstorage.datosSerieVideos.videos[i]);
            }
        }
        aux.push({
            "video": posicion,
            "minuto": minutes,
            "segundos": seconds
        });
    }
    console.log("aux");
    console.log(aux);
    return aux;
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    location.href = "ingreso.html";
}

var mediaqueryList = window.matchMedia("(max-width: 500px)");
if(mediaqueryList.matches) {
    document.getElementById("btn-1").classList.add("invisible");
    document.getElementById("btn-1").classList.remove("button");
    document.getElementById("btn-2").classList.add("button");
    document.getElementById("modo-responsive").classList.add("row");
}else{
    document.getElementById("btn-2").classList.add("invisible");
    document.getElementById("btn-2").classList.remove("button");
    document.getElementById("btn-1").classList.add("button");

}

document.getElementById("title").textContent = `${nombreSerie}`;
document.getElementById("title-cap").textContent = `${videos[posicion].id}. ${videos[posicion].nombre} `;
source.setAttribute('src', obtenerURL(posicion));
source.setAttribute('type', 'video/mp4');
video.appendChild(source);