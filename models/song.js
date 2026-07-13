import { DataTypes } from "sequelize";
import db from "../db.js";

const Song = db.define('song', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    singer: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default Song;