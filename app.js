import express from "express";
import playlistRouter from "./routers/playlist_api.js";
import {db, Playlist, Song} from "./models/index.js"

const PORT = 8000;
const app = express();

//Middleware
app.use("/playlists", playlistRouter);

app.get("/", (req, res)=>{
    res.send("Server working")
})



async function startApp() {
    await db.sync()
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

startApp()