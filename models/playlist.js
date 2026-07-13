import { DataTypes } from "sequelize";
import db from "../db.js";

const Playlist = db.define('playlist', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        defaultValue: "mixed",
    }
})

export default Playlist;