const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routerGoogle = require('./Authentication/GoogleAuth')
const routerAuthentication = require('./Authentication/routerAuthentication')
const routerMedia = require('./Media/mediaRouter')
const peintureRouter = require('./PeintureBill/peintureRouter')
const routerComment = require('./Comment/commentRouter')
const placoRouter = require('./PlacoBill/placoRouter')

const app = express()
const port = process.env.PORT || 8080
const URI = process.env.URI
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:'http://localhost:3000', credentials:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', routerGoogle)         
app.use('/admin', routerAuthentication)
app.use('/media', routerMedia)
app.use('/comment', routerComment)
app.use('/peinture', peintureRouter)
app.use('/placo', placoRouter)
app.use('/public', express.static("public"))
app.get('/test', (req, res) => res.send(`The API is working now ${process.env.PORT}` ))
mongoose.connect(URI ,{'dbName':'RenoluxDB'}).then(()=>console.log('Connected to the database')).catch((error) =>console.log('An error occured\n', error)) 
app.listen(port, ()=>{console.log(`The server is running at http://localhost:${port}`)})