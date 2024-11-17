const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")

 

cmd({
    pattern: "setsudo",
    react: "👨🏻‍🔧",
    alias: ["set","addsudo"],
    desc: "Set moderator.",
    category: "owner",
    use: '.setsudo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
 
const sudo_id = m.mentionUser[0]
    if(!sudo_id) return await reply(msr.gp_member)
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === sudo_id) return true
}
return false
}


 
if(await isAnti("SUDO")) return await reply(msr.ald_set)
let olddata = await get("SUDO")
olddata.push(sudo_id)
await input("SUDO", olddata)
await reply("*Moderater Add Successfull ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})



cmd({
    pattern: "delsudo",
    alias: ["rsudo","removesudo"],
    react: "👨🏻‍🔧",
    desc: "Remove moderater.",
    category: "owner",
    use: '.delsudo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)

const sudo_id = m.mentionUser[0]
   if(!sudo_id) return await reply(msr.gp_member)
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === sudo_id) return true
}
return false
}
 
if(!await isAnti("SUDO")) return await reply(msr.ald_set)
const array = await get("SUDO")
const itemToRemove = m.mentionUser[0] ? m.mentionUser[0] : from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("SUDO", array)
await reply("*Moderater Delete Successfull ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})



cmd({
    pattern: "delallsudo",
    alias: ["rasudo","removeallsudo"],
    react: "👨🏻‍🔧",
    desc: "Remove ALL Moderaters",
    category: "owner",
    use: '.delallsudo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)


const jid_rem = []
 
await input("SUDO", jid_rem)
await reply("*ALL MODERATERS REMOVED DATABASE ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//==================================================================================

cmd({
    pattern: "active",
    react: "👨🏻‍🔧",
    alias: ["setgp","addgp"],
    desc: "Set moderator group.",
    category: "owner",
    use: '.active',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)
 
const sudo_id = from
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === sudo_id) return true
}
return false
}


 if(sudo_id.includes("@g.us")) {
 
if(await isAnti("SUDO_GROUP")) return await reply(msr.ald_set)
let olddata = await get("SUDO_GROUP")
olddata.push(sudo_id)
await input("SUDO_GROUP", olddata)
await reply("*Bot Active For This Group ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} else {

await conn.sendMessage(from, { text: msr.only_gp }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '⛔', key: mek.key } }) 
  
} 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})



cmd({
    pattern: "deactive",
    alias: ["rgp","removegp"],
    react: "👨🏻‍🔧",
    desc: "Remove moderater group.",
    category: "owner",
    use: '.deactive',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)

const sudo_id = from
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === sudo_id) return true
}
return false
}
 
 if(sudo_id.includes("@g.us")) { 
  
if(!await isAnti("SUDO_GROUP")) return await reply(msr.ald_set)
const array = await get("SUDO_GROUP")
const itemToRemove = m.mentionUser[0] ? m.mentionUser[0] : from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("SUDO_GROUP", array)
await reply("*Bot Deactive For This Group ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} else {

await conn.sendMessage(from, { text: msr.only_gp }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '⛔', key: mek.key } }) 
  
} 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})



cmd({
    pattern: "delallgp",
    alias: ["ragp","removeallgp"],
    react: "👨🏻‍🔧",
    desc: "Remove ALL Moderater Groups",
    category: "owner",
    use: '.delallgp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isDev && !isOwner && !isMe ) return await reply(msr.own_cmd)


const jid_rem = []
 
await input("SUDO_GROUP", jid_rem)
await reply("*ALL MODERATER GROUP REMOVED DATABASE ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})
