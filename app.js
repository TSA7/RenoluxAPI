const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {routerAdmin, routerMedia, routerComment, routerPlaco, routerPeinture, routerPicture} = require('./Routes/RenoRoutes')
const GoogleAuth = require('./Auth0/GoogleAuth')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:'http://localhost:3000', credentials:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', GoogleAuth)         
app.use('/admin', routerAdmin)
app.use('/media', routerMedia)
app.use('/comment', routerComment)
app.use('/placo', routerPlaco)
app.use('/peinture', routerPeinture)
app.use('/medias', routerPicture)
app.use('/', express.static("public/"))
app.get('/add', (req, res)=>{
    res.cookie('cook', 'fossi', {maxAge:60*60*24*1000, httpOnly:true})
    res.send('cookie set')
})
app.get('/connect', (req, res)=>{
    const cook = req.cookies.userInfo
    if(!cook){
        return res.status(400).send('An error occured')
    }
    return res.status(200).send(JSON.parse(cook))
})
app.get('/test', (req, res)=>res.send('The API is working'))
mongoose.connect(process.env.URI, {'dbName':'RenoluxDB'}).then(()=>console.log('Connected to the database')).catch((error) =>console.log('An error occured\n', error)) 
app.listen(port, ()=>{console.log(`The server is running at http://localhost:${port}`)})