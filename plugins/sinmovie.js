const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "si",
    desc: "Fetch detailed information about a Sinhala movie.",
    category: "utility",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽 Please provide the name of the Sinhala movie.");
        }

        const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=76cb7f39`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
_🎬 𝗠ᴏᴠɪᴇ 𝗧ɪᴛʟᴇ ➢ ${data.Title} | සිංහල හඩකැවූ._

📅 *Released*: ${data.Released} 
⏱ *Runtime*: ${data.Runtime} 
🌐 *Language*: ${data.Language} 
⭐ *IMDB Rating*: ${data.imdbRating} 
🎭 *Actors*: ${data.Actors} 

📝 *Plot*: ${data.Plot}
`;

        const imageUrl = data.Poster !== "N/A" ? data.Poster : config.DEFAULT_IMAGE_URL;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: movieInfo,
        }, { quoted: mek });

    } catch (error) {
        console.error("Error fetching movie info:", error.message);
        reply("❌ An error occurred while fetching movie details.");
    }
});
