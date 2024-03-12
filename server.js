const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {port,database}=require('./config')
const app = express()
app.use(cors())

//databasa
mongoose.connect(database,()=>{
    console.log("Connecting to Database")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



app.use(require('./routes/todo'))

app.listen(port, () => {
    console.log('Server started at port'+port)
})