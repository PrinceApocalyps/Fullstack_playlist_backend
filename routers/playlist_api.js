import { Router } from "express";
import { Playlist, Song } from "../models/index.js";

const playlistRouter = Router();


playlistRouter.get("/", async (req, res) =>{
    const playlists = await Playlist.findAll();
    if (playlists.length === 0) return res.status(404).json({error: "No Saved Playlists"});
    res.json(playlists);
})

playlistRouter.get("/:id", async (req, res) =>{
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({error: "Playlist not found"});
    res.json(playlist)
})

playlistRouter.post("/", async (req, res)=>{
    const playlist = await Playlist.create(req.body)
    if (!playlist) return res.status(404).json({error: "Playlist not created"});
    res.json(playlist)
})

playlistRouter.patch("/:id", async (req, res)=>{
    const playlist = await Playlist.findByPk(req.params.id);
    console.log(playlist)
    if (!playlist) return res.status(404).json({error: "Playlist not found"});
    await playlist.update(req.body);
    res.json(playlist); 
})

playlistRouter.delete("/:id", async (req, res)=>{
    const playlist = await Playlist.findByPk(req.params.id);
    if(!playlist) return res.status(404).json({error: "Playlist not found"});
    await playlist.destroy();
    res.json(playlist);
})

playlistRouter.get("/:id/songs", async (req, res)=>{
    try{
        const playlist = await Playlist.findByPk(req.params.id, {
            include: Song,
        });
        if (!playlist) return res.status(404).json({error: "Playlist with songs not found"});

        res.json(playlist)

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

playlistRouter.post("/:id/songs", async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.id);
        if (!playlist) return res.status(404).json({ error: "Playlist not found" });

        const { songId, title, singer, genre } = req.body;

        let song;

        if (songId) {
            // Adding an existing song by id
            song = await Song.findByPk(songId);
            if (!song) return res.status(404).json({ error: "Song not found" });
        } else {
            // Creating a new song on the fly
            if (!title || !genre) {
                return res.status(400).json({ error: "title and genre are required to create a new song" });
            }
            song = await Song.create({ title, singer, genre });
        }

        await playlist.addSong(song);

        const updatedPlaylist = await Playlist.findByPk(playlist.id, {
            include: Song,
        });

        res.status(201).json(updatedPlaylist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

export default playlistRouter;