const express=require('express')
const cors=require('cors')
const allRoutes=require('./routes/userrouter')
const app=express()

require('dotenv').config()
require('./config/server').connect()

app.use(cors())
app.use(express.json())


const port=process.env.port
app.use("/api/v1",allRoutes)


app.listen(port,()=>{
    console.log(`we are listening at ${port}`)
})
