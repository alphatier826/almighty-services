const mongoose =require("mongoose")

const connection=mongoose.connect(process.env.mongoose_url)

module.exports={connection}