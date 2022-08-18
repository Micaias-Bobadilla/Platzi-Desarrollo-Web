const express = require("express")

class Jugador{
    constructor(id){
        this.id = id
    }
}

const app = express()

const ObjJugadores = []

app.get("/unirse", (req,res) => {
    const id = `${Math.random()}`

    const varjugador = new Jugador(id)

    ObjJugadores.push(varjugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)
})

app.listen(8080, () =>{
    console.log("Servidor Corriendo");
})