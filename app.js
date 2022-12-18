require('dotenv').config()
const cors = require ('cors')
const express = require('express')
const mongoose = require('mongoose')



mongoose.set('strictQuery', false);

const app = express()
app.use(cors())
mongoose
.connect(`mongodb+srv://Acrosa86:${process.env.MONGO_DB_PASS}@development.vkwbcei.mongodb.net/stock-app?retryWrites=true&w=majority`
)
.then( (result) => {
    
    app.listen(PORT, () => {
        console.log (`Servidor escuchando en el puerto ${PORT}`)
    })
    console.log ('Conexion exitosa a la BBDD')
})
.catch((err) => console.log(err))

const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    price: Number,
},
{timestamps: true}
)

const Product = mongoose.model('Product', productSchema)


app.use(express.json())


app.post('/api/v1/products', (req, res)=> {

    if (!req.body.name) {
      res
        .status (400)
        .json({
            ok: false,
            message: 'El campo Nombre del Producto es obligatorio'
        })
        return
    }

  const newProduct = new Product(req.body)

    newProduct
    .save()
    .then( result => {

    res.status(201).json({ ok: true })
    })
    .catch((err) => console.log(err)) 
 })

/*app.get('/', (req, res, next) => {
    const pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'
    axios(`${pokeApiBaseUrl}/charizard`).then((axiosResponse) => {
        const pokemon = axiosResponse.data
        console.log({ axiosResponse })
        const html = `
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App de Productos</title>
        <link rel="stylesheet" href="style.css">
        <script src="index.js" defer></script>
        </head>
        <body>
        <h1>Mi primer app</h1>
        <a href="about.html">Sobre Andres</a>
        <div class="form-container">
            <input type="text" id="productName" placeholder="Nombre del producto"> 
            <input type="number" id="productPrice" placeholder="Precio del producto">
            <button>Crear Producto  </button>
            <h2>Listado de Productos</h2>
            </div>  

        <div class = 'poke-card'>  
            <h3>${pokemon.name}</h3>
            <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name} ">
            <span>#${pokemon.id}</span>
        </div>

         </body>
        `

        res.send(html)
        
    })
  

})
*/


// app.use(express.static(path.join(__dirname, 'public')))


// Empezamos asi, pero como en diferentes sistemas operativos, 
// la separacion de las carpetas del path difiere / o \ utilizamos el path.join de arriba.

//app.get('/', (req, res)=> {
//   console.log('Peticion recibida')
//
//    res.status(200).sendFile('index.html',{root: __dirname})
//})

const PORT = process.env.PORT || 8080

