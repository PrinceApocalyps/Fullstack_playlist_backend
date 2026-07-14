import db from "./db.js";
import Playlist from "./models/playlist.js";

const playlistSeeds = [
    { title: "Late Night Drive", genre: "lofi" },
    { title: "Workout Mix", genre: "hip-hop" },
    { title: "Chill Sunday", genre: "acoustic" },
    { title: "Study Session", genre: "instrumental" },
    { title: "Throwback Hits", genre: "pop" },
    { title: "Road Trip", genre: "mixed" },
];

async function seed() {
    try {
        // sync (force: true drops and recreates the table — fine for seeding in dev)
        await db.sync({ force: true });

        await Playlist.bulkCreate(playlistSeeds);

        console.log(`Seeded ${playlistSeeds.length} playlists successfully.`);
    } catch (error) {
        console.error("Error seeding playlists:", error);
    } finally {
        await db.close();
    }
}

seed();