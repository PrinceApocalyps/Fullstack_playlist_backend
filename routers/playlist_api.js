import { Router } from "express";
import { Playlist } from "../models/index.js";

const playlistRouter = Router();


playlistRouter.get("/", async (req, res) =>{
    const playlists = await Playlist.findAll();
    if (playlists.length === 0) return res.status(404).json({error: "No Saved Playlists"});
    res.json(playlists);
})


export default playlistRouter;