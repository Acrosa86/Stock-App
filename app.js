const express = require('express')

const app = express()

app.get('/', (req, res)=> {
    console.log('peticion recibida')

    res.send('<h1>Hola Mundo Nodemon!!</h1>')
})



app.listen(3000, () => {
    console.log ('Servidor escuchando en el puerto 3000')
})