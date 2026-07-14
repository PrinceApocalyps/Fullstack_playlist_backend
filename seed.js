import { db, Playlist, Song } from "./models/index.js";

const playlistSeeds = [
    { title: "Late Night Drive", genre: "lofi" },
    { title: "Workout Mix", genre: "hip-hop" },
    { title: "Chill Sunday", genre: "acoustic" },
    { title: "Study Session", genre: "instrumental" },
    { title: "Throwback Hits", genre: "pop" },
    { title: "Road Trip", genre: "mixed" },
];

const songSeeds = [
    { title: "Reptilia", singer: "The Strokes", genre: "Rock" },
    { title: "Last Nite", singer: "The Strokes", genre: "Rock" },
    { title: "Blinding Lights", singer: "The Weeknd", genre: "Pop" },
    { title: "Sunflower", singer: "Post Malone", genre: "Hip-Hop" },
    { title: "Weightless", singer: "Marconi Union", genre: "Instrumental" },
    { title: "Landslide", singer: "Fleetwood Mac", genre: "Acoustic" },
    { title: "Circles", singer: "Post Malone", genre: "Pop" },
    { title: "Novacane", singer: "Frank Ocean", genre: "R&B" },
    { title: "Redbone", singer: "Childish Gambino", genre: "Funk" },
    { title: "Holocene", singer: "Bon Iver", genre: "Indie" },
];

async function seed() {
    try {
        // sync (force: true drops and recreates tables — fine for seeding in dev)
        await db.sync({ force: true });

        const playlists = await Playlist.bulkCreate(playlistSeeds);
        const songs = await Song.bulkCreate(songSeeds);

        // Link songs to playlists (many-to-many)
        await playlists[0].addSongs([songs[0], songs[1], songs[6]]); // Late Night Drive
        await playlists[1].addSongs([songs[3], songs[8]]);           // Workout Mix
        await playlists[2].addSongs([songs[5], songs[9]]);           // Chill Sunday
        await playlists[3].addSongs([songs[4]]);                     // Study Session
        await playlists[4].addSongs([songs[0], songs[1], songs[2]]); // Throwback Hits
        await playlists[5].addSongs([songs[2], songs[7], songs[8]]); // Road Trip

        console.log(`Seeded ${playlists.length} playlists and ${songs.length} songs successfully.`);
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await db.close();
    }
}

seed();