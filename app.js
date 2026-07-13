import express from "express";
import {db, Playlist, Song} from "./models/index.js"

const PORT = 8000;
const app = express();

app.get("/", (req, res)=>{
    res.send("Server working")
})



async function startApp() {
    await db.sync()
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost${PORT}`)
    })
}

startApp()