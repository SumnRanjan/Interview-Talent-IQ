import express from "express"
import path from 'path'
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"

const app = express()


const __dirname = path.resolve()

app.get("/hello" , (req , res)=>{
    res.status(200).json({msg : "success form apiss"})
})

//make ready for deploy
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "../FrontEnd/dist")))

    app.get("/{*any}" , (req , res)=>{
        res.sendFile(path.join(__dirname , "../FrontEnd" , "dist" , "index.html"))
    })
}



const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running at port 3000"))
  } catch (error) {
    console.error("💥 Error starting the server", error)
  }
}

startServer()