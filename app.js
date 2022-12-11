const express = require('express')
const mongoose = require('mongoose')
const path =require('path')
require('dotenv').config()

mongoose.set('strictQuery', false);

const app = express()

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
   
    const newProduct = new Product(req.body)

    newProduct
    .save()
    .then( result => {

    res.status(201).json({ ok: true })
    })
    .catch((err) => console.log(err)) 
})

app.use(express.static(path.join(__dirname, 'public')))


// Empezamos asi, pero como en diferentes sistemas operativos, 
// la separacion de las carpetas del path difiere / o \ utilizamos el path.join de arriba.

//app.get('/', (req, res)=> {
//   console.log('Peticion recibida')
//
//    res.status(200).sendFile('index.html',{root: __dirname})
//})

const PORT = process.env.PORT || 3000

