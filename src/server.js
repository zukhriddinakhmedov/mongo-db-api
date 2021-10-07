import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
// import blogPosts from ""


const server = express()

server.use(express.json())

const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to Mongo")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log(`Server running on port ${port}`)
    })
})

mongoose.connection.on("error", err => {
    console.log(err)
})