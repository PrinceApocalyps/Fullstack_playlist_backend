import { DataTypes } from "sequelize";
import db from "../db.js";
import Playlist from "./playlist.js";
import Song from "./song.js";


Playlist.belongsToMany(Song, { through: 'Songs_in_playlist' });
Song.belongsToMany(Playlist, { through: 'Songs_in_playlist' });

export {db, Playlist, Song}