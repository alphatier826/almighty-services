const express = require("express")
const auth=require("./Middleware/Middleware")
const cors=require("cors")

require("dotenv").config()

const {connection} = require("./config/data");
const { UserRouters } = require("./Router/User.Router");
const { NewsController } = require("./controller/NewsController");


const app=express();

app.use(express.json())

app.use(cors({
    origin:"*"
}))

var router = express.Router();

app.get("/healthCheck", function (req, res) {
	res.status(200);
	res.type("application/json");
	res.json("Service is up and running !!!");
});

app.get("/",(req,res)=>{
    res.send("web")
})

app.use("/user",UserRouters);
app.use("/news", NewsController)

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