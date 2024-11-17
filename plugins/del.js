const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


cmd({
    pattern: "del",
    react: "✔️",
    alias: ["delete"],
    desc: "Delete messages for everyone",
    category: "owner",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
  
if ( !m.quoted ) return reply('ℹ️ *Please quote the Message*')
if (m.quoted.sender == botNumber2 ) {
 if (!isDev) return reply(msr.own_cmd) 
   let { chat, fromMe, id, isBaileys } = m.quoted
   return await conn.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
    }
  if ( !isGroup) return reply(msr.only_gp)
    if ( !isAdmins ) return reply(msr.you_adm)
  if ( !isBotAdmins ) return reply(msr.give_adm)
    let { chat, fromMe, id, isBaileys } = m.quoted
    await conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false , id: m.quoted.id, participant: m.quoted.sender } })
   
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
await conn.sendMessage(from, { text: msr.err }, { quoted : mek })
console.log(e)
await conn.sendMessage(creator, { text: `❌ *Error Accurated !!*\n\n${e}` + '' }, { quoted : mek })
}
})
