// XVIDEO DOWNLOAD COMMAND

const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )



cmd({
    pattern: "xvideo",
    alias: ["xvdl","xvdown","x"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
if(xv_list.result.length < 0) return await reply("Not results found !")

const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${xv_list.result[0].url}`)
    
  // FIRST VIDEO
  
const msg =` 

       🔥    *XVIDEO DOWNLOADER*   🔥

❍⚯───────────────────────────────⚯❍       
🔮 *Title* - ${xv_info.result.title}
🔮 *Views* - ${xv_info.result.views}
🔮 *Like* - ${xv_info.result.like}
❍⚯───────────────────────────────⚯❍

> 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𓄂𝐎ᴡͥɳͣᴇͫᴙ  𝐂ʏ͢ʙᴇʀ  𝚇 Aʏ͢ᴇꜱʜ
`
await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (error) {
console.log(error)
reply(error)
}
})

// aaa
