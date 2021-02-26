var posicion = 0;
var nombreSerie = "";
const video = document.getElementById('video');
const source = document.createElement('source');
const videos = [
    {
        id: '1',
        nombre: 'La leyenda del caballero negro',
        url: 'https://u.pcloud.link/publink/show?code=XZmVuuXZN1gJifHDpdXJetHoooqpfYtjQ0i7'
    },
    {
        id: '2',
        nombre: 'Una pista para Scooby-Doo',
        url: 'https://u.pcloud.link/publink/show?code=XZn5fuXZQVmuvi786lhKGdxN2eLJBFd2Timk'
    },
    {
        id: '3',
        nombre: 'El Fantasma del Castillo',
        url: 'https://u.pcloud.link/publink/show?code=XZjqbuXZ1DAeRhQJ4C833by70yKcCmFx084X'
    },
    {
        id: '4',
        nombre: 'El Fantasma de Ciudad de Oro',
        url: 'https://u.pcloud.link/publink/show?code=XZi5fuXZzlysBFDNJxLMomy71x7R1ybzdny0'
    },
    {
        id: '5',
        nombre: 'El Señuelo',
        url: 'https://u.pcloud.link/publink/show?code=XZRJfuXZXlDjQege7OYR0XK0rVpF0hEcXkaX'
    },
    {
        id: '6',
        nombre: 'Con mil demonios - Qué pasa aquí',
        url: 'https://u.pcloud.link/publink/show?code=XZTJfuXZD4VTpNeKoE48t27sqcc3cFkiGizk'
    },
    {
        id: '7',
        nombre: 'Jamás persigas a un hombre mono',
        url: 'https://u.pcloud.link/publink/show?code=XZKJfuXZ622pztQRRvYOuc6Mfg2piz6EtoQ7'
    },
    {
        id: '8',
        nombre: 'Falla divertida en los juegos mecánicos',
        url: 'https://u.pcloud.link/publink/show?code=XZvJfuXZ38z6M6VXnzLOHx1GQPMvp0uiEuOX'
    },
    {
        id: '9',
        nombre: 'El teatro de los billetes falsos',
        url: 'https://u.pcloud.link/publink/show?code=XZpFfuXZM01nOc49LkphmfzEwNGyfbJ6U2w7'
    },
    {
        id: '10',
        nombre: 'El caso del payaso Fantasma',
        url: 'https://u.pcloud.link/publink/show?code=XZuFfuXZuG7yC23ATwjU1ox7U5q0fQOGG5SV'
    },
    {
        id: '11',
        nombre: 'El castillo de Frankenstein',
        url: 'https://u.pcloud.link/publink/show?code=XZOFfuXZpfbltHFhmzLWYhhLt6GH7FEoEJyk'
    },
    {
        id: '12',
        nombre: 'Scooby-Doo y una momia también',
        url: 'https://u.pcloud.link/publink/show?code=XZaFfuXZPDoDaP2OGDuUhsYHNiczDFMu8FTV'
    },
    {
        id: '13',
        nombre: 'Cómo pescar una bruja',
        url: 'https://u.pcloud.link/publink/show?code=XZHpfuXZdPUpiaybEOjHxnYlr8dyHL6FHxny'
    },{
        id: '14',
        nombre: 'El Fantasma del Aeropuerto Abandonado',
        url: 'https://u.pcloud.link/publink/show?code=XZQpfuXZDlDGXXT0XmYyq1Y90Gxgb0xspdGX'
    },{
        id: '15',
        nombre: 'Esfúmate Barco Fantasma',
        url: 'https://u.pcloud.link/publink/show?code=XZhpfuXZb9usHxx8a9Frx6lTNjLBN7h7LRXy'
    },{
        id: '16',
        nombre: 'Una Noche de Espanto, Causa Quebranto',
        url: 'https://u.pcloud.link/publink/show?code=XZnpfuXZAqRpetYTjW8Lpp6UCjFaiVlhKxAX'
    },{
        id: '17',
        nombre: 'El Fantasma de las Nieves',
        url: 'https://u.pcloud.link/publink/show?code=XZapfuXZ6UOtrUJodbRkNAlMBLuTgm3p3LKy'
    },{
        id: '18',
        nombre: 'El Espectro de Hyde',
        url: 'https://u.pcloud.link/publink/show?code=XZopfuXZI6NqlrXFf0BNQEMtk4or5uQrR33y'
    },{
        id: '19',
        nombre: 'La Máscara de Zen-Túo',
        url: 'https://u.pcloud.link/publink/show?code=XZ0HfuXZ1Pd59no3x3ktgcjxLp8i6moUnRTX'
    },{
        id: '20',
        nombre: 'El Papel Misterioso',
        url: 'https://u.pcloud.link/publink/show?code=XZbHfuXZr0fTqw95SCpzLhyXKSXgB8f8yMCy'
    },{
        id: '21',
        nombre: 'La Noche de los Pies Helados',
        url: 'https://u.pcloud.link/publink/show?code=XZuHfuXZvKDl5k3xR7Xg8dNMexpvGSc17wU7'
    },{
        id: '22',
        nombre: 'La Leyenda del Decapitado',
        url: 'https://u.pcloud.link/publink/show?code=XZeHfuXZzd5nGo5Kj1YbRO4l1FSYTHrmGBCX'
    },{
        id: '23',
        nombre: 'La Aldea Encantada',
        url: 'https://u.pcloud.link/publink/show?code=XZgHfuXZy8292AoIDS5maqGkTyqmBjpd7ldV'
    },{
        id: '24',
        nombre: 'Quién Teme al Lobo Feroz',
        url: 'https://u.pcloud.link/publink/show?code=XZPHfuXZJg1HSKYf4TyjHWxNz3kEnpW771tV'
    },{
        id: '25',
        nombre: 'No Juegues con un Fantasma',
        url: 'https://u.pcloud.link/publink/show?code=XZKHfuXZljlcnSAh6wQbJJ7MMjT5SRRWdHRX'
    }
]

async function obtenerURL(value){
    var url = { prueba: {lista: []}};
    // const parseName = videos[value].nombre.split(" ");
    // var nombreParseado = "";
    // nombreParseado = videos[value].id + ".";
    // for (let i = 0; i < parseName.length; i++) {
    //     nombreParseado = nombreParseado + '%20' + parseName[i];
    // }
    // url = `https://liveudenaredu-my.sharepoint.com/personal/hugoandres272_udenar_edu_co/Documents/Scooby/${nombreParseado}.mp4?App=OneDriveWebVideo`;
    await fetch(videos[value].url)
    .then(res=>res.text())
    .then(res2=>{
        const asdf = res2.split('"variants": [')[1];
        var i = 0;
        var cad = "";
        while(asdf[i]!='}' && asdf[i+1]!=';'){
            cad = cad + asdf[i];
            i++;
        }
        cad = cad + "}";
        let urlnueva = "https://p-def4.pcloud.com"+JSON.parse(cad).path;
        url.prueba.lista = urlnueva;
    })
    return url.prueba.lista;
}

function anteriorVideo(){
    if (posicion>0) {
        enviarDatos();
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
        enviarDatos();
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
    // console.log(obtenerParametroGet(window.location.href));
    nombreSerie = obtenerParametroGet(window.location.href);
    
    // console.log(window.location.href);
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
        // console.log("datos traertiempo=");
        // console.log(res2);
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
            // videoActual();
            if (aux!==-1) {
                video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
            }
            videoActual();
        }else{
            posicion = 0;
            videoActual();
        }
        document.getElementById("cargando").classList.add("invisible");
    })
}

function obtenerParametroGet(url){
    // console.log(url.split("?")[1]);
    const paramget = url.split("?");
    var paramget2 = "";
    if(paramget[1]===undefined){
        console.log("asdfasdfkl");
        window.location.href = "indexSeriesAll.html";
    }else{
        paramget2 = paramget[1].split("=");
    }
    return paramget2[1];
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

async function videoActual(){
    document.getElementById("title").textContent = `${nombreSerie}`;
    document.getElementById("title-cap").textContent = `${videos[posicion].id}. ${videos[posicion].nombre} `;
    source.setAttribute('src', await obtenerURL(posicion));
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
    // console.log("data: enviardatos=")
    // console.log(data);
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
    // console.log("aux");
    // console.log(aux);
    return aux;
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    location.href = "ingreso.html";
}

function cargarLista(){
    var vector = "";
    for (let i = 0; i < videos.length; i++) {
        vector = vector + `<li class="${videoActualDat(videos[i].id)}"><a onclick="cargarVideoEnPosicion(${videos[i].id})">${videos[i].id}. ${videos[i].nombre}</a></li>`;
    }
    function videoActualDat(id){
        if(parseInt(id)===(parseInt(posicion)+1)){
            return 'remarcar';
        }
    }
    document.getElementById("listas-a").innerHTML = vector;
}
var mediaqueryList = window.matchMedia("(max-width: 600px)");

function cargarVideoEnPosicion(e){
    posicion = parseInt(e)-1;
    videoActual();
    var aux = videoTieneVisualizacion();
    if (aux!==-1) {
        var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
        video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
    }
    enviarDatos();
    document.getElementById("listas-a").classList.remove("mostrar-lista-resp");
    if(mediaqueryList.matches){
        document.getElementById("btn-list-2").innerHTML = '&#9650; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
    }else{
        document.getElementById("btn-list-2").innerHTML = '&#129154;';
    }
    document.getElementById("btn-list").classList.remove("cambio-root");
    document.getElementById("listas-a").innerHTML = "";
    document.getElementById("btn-list").classList.remove("cambio-color-boton");
}

function desplegarLista(){
    // console.log(document.querySelector("#btn-list.cambio-root"));
    if(mediaqueryList.matches){
        if(document.querySelector("#listas-a.mostrar-lista-resp")!==null){
            document.getElementById("listas-a").classList.remove("mostrar-lista-resp");
            document.getElementById("btn-list-2").innerHTML = '&#9650; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
            document.getElementById("btn-list").classList.remove("cambio-root");
            document.getElementById("listas-a").innerHTML = "";
            document.getElementById("btn-list").classList.remove("cambio-color-boton");
            document.getElementById("video").classList.remove("video-z");
        }else{
            document.getElementById("btn-list-2").innerHTML = '&#9660; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
            document.getElementById("btn-list").classList.add("cambio-color-boton");
            document.getElementById("listas-a").classList.add("mostrar-lista-resp");
            document.getElementById("video").classList.add("video-z");
            cargarLista();
        }
    }else{
        if(document.querySelector("#btn-list.cambio-root")===null){
            document.getElementById("btn-list").classList.add("cambio-root");
            document.getElementById("btn-list-2").innerHTML = '&#129152;';
            cargarLista();
        }else{
            document.getElementById("btn-list").classList.remove("cambio-root");
            document.getElementById("btn-list-2").innerHTML = '&#129154;';
            document.getElementById("listas-a").innerHTML = "";
        }
    }
}

if(mediaqueryList.matches) {
    document.getElementById("btn-1").classList.add("invisible");
    document.getElementById("btn-1").classList.remove("button");
    document.getElementById("btn-2").classList.add("button");
    document.getElementById("modo-responsive").classList.add("row");
    document.getElementById("btn-list-2").innerHTML = '&#9650; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
}else{
    document.getElementById("btn-list-2").innerHTML = '&#129154;';
    document.getElementById("btn-2").classList.add("invisible");
    document.getElementById("btn-2").classList.remove("button");
    document.getElementById("btn-1").classList.add("button");
}

function home(){
    location.href = 'indexSeriesAll.html'
}

// document.getElementById("title").textContent = `${nombreSerie}`;
// document.getElementById("title-cap").textContent = `${videos[posicion].id}. ${videos[posicion].nombre} `;
// source.setAttribute('src', obtenerURL(posicion));
source.setAttribute('type', 'video/mp4');
video.appendChild(source);