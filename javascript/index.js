var posicion = 0;
var nombreSerie = "";
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const source = document.createElement('source');
const siguienteSkip = document.getElementById('siguienteSkip');
const btnSig = document.getElementById('btn-sig');
var esVideo = true;
let videos = [];
var flag = true;
var autoNext = true;

async function quitarSaltarIntro() {
    return await new Promise(resolve => {
        const interval = setInterval(() => {
        if (video.currentTime>=parseInt(videos[posicion].skipTime)) {
            document.getElementById("skip").classList.add("invisible");
            flag=false;
            clearInterval(interval);
        }
      }, 2000);
    });
}

const clock = document.getElementById('clock');

async function finalRecurso(time) {
    return await new Promise(resolve => {
        const interval = setInterval(()=>{
            if(esVideo){
                if (video.currentTime === time) {
                    timeTen();
                    clearInterval(interval);
                }
            }else{
                if (audio.currentTime === time) {
                    timeTen();
                    clearInterval(interval);
                }
            }
        }, 1000);
    });
}

async function timeTen(){
    var timeTemp = esVideo ? 10 : 5;
    siguienteSkip.classList.remove('invisible');
    for (let i = 0; i <= timeTemp; i++) {
        await promise(timeTemp-i)
        .then(res => {
            clock.innerHTML = res;
        })
    }
    if(autoNext){
        siguienteVideo();
    }
}

function promise(timeSegundos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(timeSegundos);
        }, 1000);
    });
}

quitarSaltarIntro();

async function obtenerURL(value){
    var url = { prueba: {lista: []}};
    if(videos[value].audio && videos[value].audio === true){
        esVideo = false;
        fetch(videos[value].url)
        .then(res=>res.text())
        .then(res=>{
            const av = res.split('var publinkData =')
            audio.src = JSON.parse(av[1].split(';')[0]).downloadlink;
        })
        video.classList.add('invisible')
        audio.classList.remove('invisible');
    }else{
        esVideo = true;
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
        video.classList.remove('invisible')
        audio.classList.add('invisible');
    }
    return url.prueba.lista;
}

async function anteriorVideo(){
    if (posicion>0) {
        enviarDatos();
        posicion--;
        await videoActual();
        var aux = videoTieneVisualizacion();
        if (aux!==-1) {
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
        }
        enviarDatos();
    }
}

async function siguienteVideo(){
    if (posicion<videos.length) {
        enviarDatos();
        posicion++;
        await videoActual();
        var aux = videoTieneVisualizacion();
        if (aux!==-1) {
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            if(esVideo) {
                video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
            }else{
                audio.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
            }
        }
        enviarDatos();
        siguienteSkip.classList.add('invisible');
        btnSig.classList.remove('invisible');
        if(esVideo){
            video.play();
        }else{
            audio.play();
        }
    }
}

function tiempoDeVisualizacion(){
    var value = video.currentTime;
    var seconds = Math.floor(value % 60);
    var minutes = Math.floor((value/60) % 60);
    var hours = Math.floor(value*3600);
}

async function traerTiempo(){
    const botonRegistro = document.getElementById('btn-registro');
    const ttp = localStorage.getItem('ttp');
    if(ttp !== 'ffp') {
        botonRegistro.classList.add('invisible')
    }
    var tiempo = null;
    console.log("traer tiempo");
    nombreSerie = obtenerParametroGet(window.location.href);
    videos = await cargarDatosCapitulos();
    console.log("videos ",videos);
    try {
        const datosvideos = JSON.parse(localStorage.getItem("datosvideos"));
        if (datosvideos && datosvideos.serie!==nombreSerie) {
            localStorage.setItem("datosvideos", null);
        }
    } catch (error) {
        console.error("Parse fallido: "+error);
    }
    var data = {
        "email": localStorage.getItem("email"),
        "serie": nombreSerie
    };
    
    fetch(`https://harry.alwaysdata.net/${nombreSerie}`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("x-access-token")
        }
    })
    .then(res => {
        console.log("res ",res);
        if(res && res.status === 401) {
            console.log("llega 1");
            cerrarSesion();
        }else {
            console.log("llega 2",res.status);
            return res.json();
        }
    })
    .then(res2 => {
        if(res2.status!=='no encontrado'){
            localStorage.setItem("datosvideos", JSON.stringify(res2));
            var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
            if(datosLocal!==null){
                posicion =  parseInt(datosLocal.datosSerieVideos.videoActSerie);
            }else{
                posicion = 0;
            }
            
            var aux = videoTieneVisualizacion();
            if (aux!==-1) {
                var time = 0;
                var horas = 0;
                if (datosLocal.datosSerieVideos.videos[aux].horas!==undefined) {
                    horas = datosLocal.datosSerieVideos.videos[aux].horas;
                }
                time = (horas*3600)+(datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
                video.currentTime = time;
                audio.currentTime = time;
                if (parseInt(time)>=parseInt(videos[posicion].skipTime)) {
                    document.getElementById("skip").classList.add("invisible");
                }
            }
            videoActual();
        }else{
            posicion = 0;
            videoActual();
        }
    })
    .catch(err => {
        console.log("err ",err)
    })
}

function obtenerParametroGet(url){
    const paramget = url.split("?");
    var paramget2 = "";
    if(paramget[1]===undefined){
        window.location.href = "indexSeriesAll.html";
    }else{
        paramget2 = paramget[1].split("=");
    }
    return paramget2[1];
}

async function cargarDatosCapitulos(){
    var url = { prueba: {lista: []}};
    await fetch(`https://harry.alwaysdata.net/capitulos/${nombreSerie}`,{
        headers:{
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("x-access-token")
        }
    })
    .then(res=>{
        console.log("res videos ",res.status);
        if(res && res.status === 401) {
            cerrarSesion();
        }else {
            return res.json();
        }
    })
    .then(res2=>{
        url.prueba.lista = JSON.parse(res2);
    })
    .catch(err => {
        console.log("err ",err);
    })
    return url.prueba.lista;
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
    // document.getElementById("title").textContent = `${nombreSerie}`;
    document.getElementById("title-cap").textContent = `${videos[posicion].id}. ${videos[posicion].nombre} `;
    if(esVideo){
        source.setAttribute('src', await obtenerURL(posicion));
        video.appendChild(source);
        video.load();
        // video.pause();
    }else{
        audio.src = await obtenerURL(posicion);
        audio.load();
    }
}

video.onpause = function(){
    enviarDatos();
}

audio.onpause = function(){
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
    fetch(`https://harry.alwaysdata.net/${nombreSerie}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("x-access-token")
        }
    })
    .then(res => {
        if(res && res.status === 401) {
            cerrarSesion();
        }else {
            return res.json();
        }
    })
    .then(res2 => console.log(res2))
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    localStorage.removeItem("x-access-token");
    location.href = "ingreso.html";
}

function llenarListaVideos(){
    var aux = [];
    var localstorage = null;
    var value = esVideo?video.currentTime:audio.currentTime;
    var seconds = Math.floor(value % 60);
    var minutes = Math.floor((value/60) % 60);
    var hours = Math.floor(value/3600);

    localstorage = JSON.parse(localStorage.getItem("datosvideos"));
    if (localstorage===null) {
        aux.push({
            "video": posicion,
            "horas": hours,
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
            "horas": hours,
            "minuto": minutes,
            "segundos": seconds
        });
    }
    return aux;
}

function cerrarSesion(){
    localStorage.removeItem("email");
    localStorage.removeItem("datosvideos");
    localStorage.removeItem("x-access-token");
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

async function cargarVideoEnPosicion(e){
    document.getElementById("listas-a").classList.remove("mostrar-lista-resp");
    if(mediaqueryList.matches){
        document.getElementById("btn-list-2").innerHTML = '&#9650; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
    }else{
        document.getElementById("btn-list-2").innerHTML = '&#129154;';
    }
    document.getElementById("btn-list").classList.remove("cambio-root");
    document.getElementById("listas-a").innerHTML = "";
    document.getElementById("btn-list").classList.remove("cambio-color-boton");
    document.getElementById("video").classList.remove("video-z");
    document.getElementById("audio").classList.remove("video-z");
    document.getElementById("contenedor-video").classList.remove("video-z");
    posicion = parseInt(e)-1;
    await videoActual();
    var aux = videoTieneVisualizacion();
    if (aux!==-1) {
        var datosLocal = JSON.parse(localStorage.getItem("datosvideos"));
        video.currentTime = (datosLocal.datosSerieVideos.videos[aux].minuto*60)+datosLocal.datosSerieVideos.videos[aux].segundos;
    }
    enviarDatos();
}

video.oncanplay = function(){
    document.getElementById("cargando").classList.add("invisible");
    // finalRecurso(video.duration);
    if(autoNext){
        video.play();
    }
}

audio.oncanplay = function(){
    document.getElementById("cargando").classList.add("invisible");
    // finalRecurso(audio.duration);
    if(autoNext){
        audio.play();
    }
}

audio.addEventListener('ended',() => {
    timeTen();
})

function desplegarLista(){
    if(mediaqueryList.matches){
        if(document.querySelector("#listas-a.mostrar-lista-resp")!==null){
            document.getElementById("listas-a").classList.remove("mostrar-lista-resp");
            document.getElementById("btn-list-2").innerHTML = '&#9650; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
            document.getElementById("btn-list").classList.remove("cambio-root");
            document.getElementById("listas-a").innerHTML = "";
            document.getElementById("btn-list").classList.remove("cambio-color-boton");
            document.getElementById("video").classList.remove("video-z");
            document.getElementById("audio").classList.remove("video-z");
            document.getElementById("skip").classList.remove("skip-z");
            document.getElementById("contenedor-video").classList.remove("video-z");
        }else{
            document.getElementById("btn-list-2").innerHTML = '&#9660; &nbsp;&nbsp;&nbsp;&nbsp; Capitulos';
            document.getElementById("btn-list").classList.add("cambio-color-boton");
            document.getElementById("listas-a").classList.add("mostrar-lista-resp");
            document.getElementById("video").classList.add("video-z");
            document.getElementById("audio").classList.add("video-z");
            document.getElementById("contenedor-video").classList.add("video-z");
            document.getElementById("skip").classList.add("skip-z");
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
    location.href = 'indexSeriesAll.html';
}
function registrarUsuarioNuevo(){
    location.href = 'registro.html';
}

function cambiarTiempoSkip(){
    video.currentTime = videos[posicion].skipTime;
    document.getElementById("skip").classList.add("invisible");
    enviarDatos();
}
if(esVideo){
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
}

function cancelSkipAuto() {
    siguienteSkip.classList.add('invisible');
    autoNext = false;
}