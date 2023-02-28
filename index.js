const express = require("express")
const auth=require("./Middleware/Middleware")
const cors=require("cors")

require("dotenv").config()

const {connection} = require("./config/data");
const { UserRouters } = require("./Router/User.Router");


const app=express();

app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.get("/",auth,(req,res)=>{
    res.send("web")
})

app.use("/user",UserRouters)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("connection to db cloud")


    }
    catch(err){
        console.log(err)

    }
    console.log("working on 5000")
})