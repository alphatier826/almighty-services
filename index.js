const express = require("express")
const auth=require("./Middleware/Middleware")
const cors=require("cors")
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

require("dotenv").config()

const {connection} = require("./config/data");
const { UserRouters } = require("./Router/User.Router");
const { NewsController } = require("./controller/NewsController");

const app=express();

app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

/*Helmet helps to secure Express apps by setting various HTTP headers*/
app.use(helmet());
app.set("etag", false);

app.use(cors({
    origin:"*"
}))

var router = express.Router();

app.get("/healthCheck", function (req, res) {
	res.status(200);
	res.type("application/json");
	res.json("Service is up and running !!!");
});

/*To avoid the application on crash during UnCaught Exception Occurs*/
process.on("uncaughtException", function (error) {
	console.error("UncaughtException ==> ", error);
});

app.get("/",(req,res)=>{
    res.send("web")
})

app.use("/user",UserRouters);
app.use("/news",auth, NewsController)

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