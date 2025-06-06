const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routerMedia = require('./Media/mediaRouter')
const routerComment = require('./Comment/commentRouter')

const app = express()
const port = process.env.PORT || 8080
const URI = process.env.URI
app.use(express.json())
app.use(cors({origin:['http://localhost:3000', 'https://renolux.tsasoft.com'], credentials:true, methods:['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders:['Content-Type', 'Authorization']}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/media', routerMedia)
app.use('/comment', routerComment)
mongoose.connect(URI ,{'dbName':'RenoluxDB'}).then(()=>console.log('Connected to the database')).catch((error) =>console.log('An error occured\n', error)) 
app.listen(port, ()=>{console.log(`The server is running at http://localhost:${port}`)})