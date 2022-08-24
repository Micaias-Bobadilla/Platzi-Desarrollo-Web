
const sectionSeleccionAtaque = document.getElementById("seleccionar-ataque")
const sectionReinicio = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-seleccion")
const botonReiniciar = document.getElementById("reiniciar")

const sectionSeleccionMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const HTMLvictoriasJugador = document.getElementById("victorias-jugador")
const HTMLvictoriasEnemigo = document.getElementById("victorias-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")

const botonesAtaque = document.getElementById("ataques-botones")

const sectionMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let enemigoId = null
let jugadorId = null
let mokepones = [] //arreglo
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = [] //variable global
let indexAtaqueJugador
let indexAtaqueEnemigo
let opcionDeMokepones
let opcionDeAtaques
let ataquesMokeponEnemigo
let botones = []
let mascotaJugador
let mascotaJugadorObjeto
let botonAgua 
let botonFuego 
let botonTierra
let  hipo 
let  capi 
let  rati 
let  Lasgo 
let  tuca 
let  pydos 
let cantVictoriasJugador=0
let cantVictoriasEnemigo=0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemapa.jpg'
//mapaBackground.src = '/Mokepon/assets/mokemapa.jpg' aca 
mapaBackground.src = '/assets/mokemapa.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 640

if (anchoDelMapa> anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon{

    constructor (nombre, imagen, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.ancho = 70
        this.alto = 70
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)    
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagen
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let hipodoge = new Mokepon("Hipodoge", './assets/poke1.png', 3)
let capipepo = new Mokepon("Capipepo", './assets/poke2.png', 3)
let ratigueya = new Mokepon("Ratigueya", './assets/poke3.png', 3)
let lasgostelvis = new Mokepon("Lasgostelvis", './assets/poke4.png', 3)
let tucapalma = new Mokepon("Tucapalma", './assets/poke5.png', 3)
let Pydos = new Mokepon("Pydos", './assets/poke6.png', 3)


const HIPODOGE_ATAQ = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: '💧', id: "boton-agua"},
    {nombre: '💧', id: "boton-agua"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🔥', id: "boton-fuego"},
]
const CAPIPEPO_ATAQ = [
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: '🔥', id: "boton-fuego"},
]
const RATIGUEYA_ATAQ = [
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: '🟫', id: "boton-tierra"},
]
const LASGOSTELVIS_ATAQ = [
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🟫', id: "boton-tierra"},
]
const TUCAPALMA_ATAQ = [
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: '🟫', id: "boton-tierra"},
]

const PYDOS_ATAQ = [
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: '🟫', id: "boton-tierra"},
    {nombre: '🟫', id: "boton-tierra"},
]
hipodoge.ataques.push(...HIPODOGE_ATAQ)
capipepo.ataques.push(...CAPIPEPO_ATAQ)
ratigueya.ataques.push(...RATIGUEYA_ATAQ)
lasgostelvis.ataques.push(...LASGOSTELVIS_ATAQ)
tucapalma.ataques.push(...TUCAPALMA_ATAQ)
Pydos.ataques.push(...PYDOS_ATAQ)


mokepones.push(hipodoge,capipepo,ratigueya,lasgostelvis,tucapalma,Pydos)

function iniciarJuego(){
    
    sectionSeleccionAtaque.style.display = "none"  //oculto el boton de selecconar ataque
    sectionMapa.style.display = "none"
 

    mokepones.forEach((Mokepon) => {
       opcionDeMokepones = ` <input type="radio"  name="mascota" id=${Mokepon.nombre}>
       <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
           <p>${Mokepon.nombre}</p>
           <img src=${Mokepon.imagen} alt=${Mokepon.nombre}>
       </label>
       `
       contenedorTarjetas.innerHTML += opcionDeMokepones

        hipo = document.getElementById("Hipodoge")
        capi = document.getElementById("Capipepo")
        rati = document.getElementById("Ratigueya")
        Lasgo = document.getElementById("Lasgostelvis")
        tuca = document.getElementById("Tucapalma")
        pydos = document.getElementById("Pydos")
    })
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador) //escuchadores de seleccion de mokepones
   
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"

    unirseAlJuego()
 
}

function unirseAlJuego(){
    fetch("http://192.168.104.203:8080/unirse")
        .then(function (res) {
            if (res.ok) {   
                res.text()
                    .then( function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
   
    sectionSeleccionMascota.style.display = "none"

    let seleccionado= true

    if (hipo.checked==true){
        spanMascotaJugador.innerHTML = hipo.id
        mascotaJugador = hipo.id
     }else if(capi.checked==true){
         spanMascotaJugador.innerHTML = capi.id
         mascotaJugador = capi.id
     }else if (rati.checked==true){
         spanMascotaJugador.innerHTML = rati.id
         mascotaJugador = rati.id
     }else if(Lasgo.checked==true){
         spanMascotaJugador.innerHTML = Lasgo.id
         mascotaJugador = Lasgo.id
     }else if (tuca.checked==true){
         spanMascotaJugador.innerHTML = tuca.id
         mascotaJugador = tuca.id
     }else if(pydos.checked==true){
         spanMascotaJugador.innerHTML = pydos.id
         mascotaJugador = pydos.id
     }else{
         seleccionado=false
         alert("Mira no seleccionaste")
         location.reload();
     }
 
     if(seleccionado==true){
        seleccionarMokepon(mascotaJugador)
        extraerAtaques(mascotaJugador)
        sectionMapa.style.display = "flex" 
        iniciarMapa();         
     }
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.104.203:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre == mascotaJugador){
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

    ataques.forEach((ataques)=>{
        opcionDeAtaques = `<button id="${ataques.id}" class="boton-de-ataque BAtaque">${ataques.nombre}</button>`

        botonesAtaque.innerHTML += opcionDeAtaques

    }) 

    botonFuego = document.getElementById("boton-fuego")
    botonTierra =document.getElementById("boton-tierra")
    botonAgua = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥'){
                ataqueJugador.push('🔥')
                console.log("Jugador " + ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('💧')
                console.log("Jugador " + ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true
            } else{
                ataqueJugador.push('🟫')
                console.log("Jugador " + ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true
           }
           if (ataqueJugador.length===5){
                enviarAtaques()
           }
           
        //    cargandoAtaqueEnemigo()
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.104.203:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.104.203:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function({ ataques }){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
    
}


function seleccionarMascotaEnemigo(enemigo){
    
       spanMascotaEnemigo.innerHTML = enemigo.nombre
       ataquesMokeponEnemigo = enemigo.ataques
       secuenciaAtaque();

}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min +1) + min)
}
    

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
       if(ataqueJugador[i]=== ataqueEnemigo[i] ){
        indexAmbosOponentes(i, i)
        crearMensaje(" EMPATE")
       }else  if (ataqueJugador[i] == "💧" && ataqueEnemigo[i] == "🔥"){
            indexAmbosOponentes(i, i)
            cantVictoriasJugador++;
            crearMensaje(" GANASTE")    
       }else if (ataqueJugador[i] == "🔥" && ataqueEnemigo[i] == "🟫"){
        indexAmbosOponentes(i, i)
        cantVictoriasJugador++;
        crearMensaje(" GANASTE")
   }else if (ataqueJugador[i] == "🟫" && ataqueEnemigo[i] == "💧"){
    indexAmbosOponentes(i, i)
    cantVictoriasJugador++;
    crearMensaje(" GANASTE")
}else {
    indexAmbosOponentes(i,i)
    cantVictoriasEnemigo++;
    crearMensaje(" PERDISTE")
   
}
    }
    
    revisarVictorias()
}

function revisarVictorias(){
    if(cantVictoriasJugador===cantVictoriasEnemigo){
        crearMensajeFinal("Woe el combate ha terminado en EMPATE",cantVictoriasJugador,cantVictoriasEnemigo)
        botonesAtaque.style.display = "none"
    }else if(cantVictoriasJugador >cantVictoriasEnemigo){
        crearMensajeFinal(" FELICIDADES GANASTE!! 🎉😎", cantVictoriasJugador, cantVictoriasEnemigo)
        botonesAtaque.style.display = "none"
    }else {
        crearMensajeFinal(" LO SIENTO MUCHO HAS PERDIDO!",cantVictoriasJugador, cantVictoriasEnemigo)
        botonesAtaque.style.display = "none"
    }
}

function crearMensajeFinal(resultadoFinal,resultForInnerJugador, resultForInnerEnemigo){
    
    sectionMensajes.innerHTML =  resultadoFinal

    HTMLvictoriasJugador.innerHTML = resultForInnerJugador
    HTMLvictoriasEnemigo.innerHTML = resultForInnerEnemigo

        
    botonAgua.disabled = true
    botonFuego.disabled = true   
    botonTierra.disabled = true

    sectionReinicio.style.display = "block"
}

function cargandoAtaqueEnemigo(){
    let enemigo = aleatorio(1,3)
    switch(enemigo){
        case(1):
        ataqueEnemigo.push("🔥")
        break;
        case(2):
        ataqueEnemigo.push("💧")
        break;
        case(3):
        ataqueEnemigo.push("🟫")
        break;
    }
    console.log("Enemigo " + ataqueEnemigo);
    inciarPelea()
}

function inciarPelea() {
    if (ataqueEnemigo.length === 5){
        combate()
    }
}

function reiniciarJuego(){
    location.reload()
}

function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach( function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x,y){
    fetch(`http://192.168.104.203:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function ({ enemigos }){
                       
                        mokeponesEnemigos=enemigos.map(function (enemigo){
                            let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || "Hipodoge"
                            if (mokeponNombre === "Hipodoge"){
                                mokeponEnemigo = new Mokepon("Hipodoge", './assets/poke1Enemi.png', 3,enemigo.id)
                            } else if (mokeponNombre === "Capipepo"){
                                mokeponEnemigo = new Mokepon("Capipepo", './assets/poke2Enemi.png', 3,enemigo.id)
                            } else if (mokeponNombre === "Ratigueya"){
                                mokeponEnemigo = new Mokepon("Ratigueya", './assets/poke3Enemi.png', 3,enemigo.id)
                            }else if (mokeponNombre === "Lasgostelvis") {
                                mokeponEnemigo = new Mokepon("Lasgostelvis", './assets/poke4Enemi.png', 3,enemigo.id)
                            }else if (mokeponNombre === "Tucapalma") {
                                mokeponEnemigo = new Mokepon("Lasgostelvis", './assets/poke4Enemi.png', 3,enemigo.id)
                            }else if (mokeponNombre === "Pydos") {
                                mokeponEnemigo = new Mokepon("Pydos", './assets/poke6Enemi.png', 3,enemigo.id)
                            }
                            
                            mokeponEnemigo.x =enemigo.x
                            mokeponEnemigo.y =enemigo.y
                            return mokeponEnemigo
                        })
                    })
            }
        })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo (){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sepresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()            
            break;
        case "ArrowDown":
            moverAbajo()            
            break;
        case "ArrowLeft":
                moverIzquierda()            
                break;
        case "ArrowRight":
            moverDerecha()            
            break;
        default:
            break;
    }

    switch (event.key) {
        case "w":
            moverArriba()            
            break;
        case "s":
            moverAbajo()            
            break;
        case "a":
            moverIzquierda()            
            break;
        case "d":
            moverDerecha()            
            break;
        default:
            break;
    }

}

function iniciarMapa (){
  
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 30)

    window.addEventListener("keydown", sepresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].nombre == mascotaJugador){
            return mokepones[i]
        }
        
    }
}

function revisarColision (enemigo){
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y +enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x 

const arribaMascota = mascotaJugadorObjeto.y
const abajoMascota = mascotaJugadorObjeto.y +mascotaJugadorObjeto.alto
const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaMascota = mascotaJugadorObjeto.x 


    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
     }
     detenerMovimiento()
     clearInterval(intervalo);
     enemigoId= enemigo.id
     sectionSeleccionAtaque.style.display = "flex"//muestra la seccion de elegir ataque
     sectionMapa.style.display = "none"
     seleccionarMascotaEnemigo(enemigo);
     console.log("sedetectounacolsion");
}
window.addEventListener('load', iniciarJuego)