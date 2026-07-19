import express from "express";
import cors from 'cors';
import playlistRouter from "./routers/playlist_api.js";
import {db, Playlist, Song} from "./models/index.js"


const usePORT = process.env.PORT || 8000;
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "Invalid JSON in request body" });
    }
    next(err);
});
app.use("/playlists", playlistRouter);

app.get("/", (req, res)=>{
    res.redirect("/playlists")
})


async function startApp() {
    await db.sync()
    app.listen(usePORT, ()=>{
        console.log(`Server running on http://localhost:${usePORT}`)
    })
}

startApp()