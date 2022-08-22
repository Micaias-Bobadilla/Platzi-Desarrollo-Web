const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const ObjJugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPôsicion (x,y){
        this.x = x,
        this.y = y
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }

}

app.get("/unirse", (req,res) => {
    const id = `${Math.random()}`

    const varjugador = new Jugador(id)

    ObjJugadores.push(varjugador)

  //  res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req,res) =>{ //Endpoint donde recibimo el nombre del mokepon seleccionado
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = ObjJugadores.findIndex((varjugador) => jugadorId === varjugador.id)

    jugadorIndex>=0 ? ObjJugadores[jugadorIndex].asignarMokepon(mokepon) : 

    
    console.log(jugadorId);
    console.log(ObjJugadores);
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req,res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y =req.body.y || 0

    const jugadorIndex = ObjJugadores.findIndex((varjugador) => jugadorId === varjugador.id)

    jugadorIndex>=0 ? ObjJugadores[jugadorIndex].actualizarPôsicion(x,y):
    res.end()
})

app.listen(8080, () =>{
    console.log("Servidor Corriendo");
})