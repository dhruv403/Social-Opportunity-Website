require('./models/user')
require('./models/post')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = 5000 || process.env.PORT 
const {MONGOURI} = require('./config/keys')
const cors = require('cors');

// Enable CORS
app.use(cors());

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo server")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on this.. :",PORT)
})

