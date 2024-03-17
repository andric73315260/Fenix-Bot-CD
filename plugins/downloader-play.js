import fetch from 'node-fetch';
import axios from 'axios';
import yts from 'yt-search';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
import ytdl from 'ytdl-core';
import {bestFormat, getUrlDl} from '../lib/y2dl.js';
import YTDL from "../lib/ytdll.js";
import fs from "fs";
let limit1 = 100;
let limit2 = 400;
let limit_a1 = 50;
let limit_a2 = 400;
const handler = async (m, {conn, command, args, text, usedPrefix}) => {
  if (!text) throw `*[𝐼𝑁𝐹𝑂𝑅𝑀𝐴𝐶𝐼𝑂́𝑁] 𝑁𝑂𝑀𝐵𝑅𝐸 𝐷𝐸 𝐿𝐴 𝐶𝐴𝑁𝐶𝐼𝑂𝑁 𝐹𝐴𝐿𝑇𝐴𝑁𝑇𝐸, 𝑃𝑂𝑅 𝐹𝐴𝑉𝑂𝑅 𝐼𝑁𝐺𝑅𝐸𝑆𝐸 𝐸𝐿 𝐶𝑂𝑀𝐴𝑁𝐷𝑂 𝑀𝐴𝑆 𝐸𝐿 𝑁𝑂𝑀𝐵𝑅𝐸 𝑌 𝑇𝐼𝑇𝑈𝐿𝑂 𝐷𝐸 𝑈𝑁𝐴 𝐶𝐴𝑁𝐶𝐼𝑂𝑁*\n\n*۞ 𝐸𝐽𝐸𝑀𝑃𝐿𝑂:*\n*${usedPrefix + command} Good Feeling - Flo Rida*`;
  try {
    const yt_play = await search(args.join(' '));
    let additionalText = '';
    if (command === 'play') {
      additionalText = 'audio 🔊';
    } else if (command === 'play2') {
      additionalText = 'video 🎥';
    }
    const texto1 = `*┈┈┈┈『𝑌𝑂𝑈𝑇𝑈𝐵𝐸』┈┈┈┈*\n
 𖤍 *𝑇𝐼𝑇𝑈𝐿𝑂:* ${yt_play[0].title}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝑃𝑢𝑏𝑙𝑖𝑐𝑎𝑑𝑜:* ${yt_play[0].ago}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛:* ${secondString(yt_play[0].duration.seconds)}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝑉𝑖𝑠𝑡𝑎𝑠:* ${`${MilesNumber(yt_play[0].views)}`}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝐴𝑢𝑡𝑜𝑟:* ${yt_play[0].author.name}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝐶𝑎𝑛𝑎𝑙:* ${yt_play[0].author.url}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 𖤍 *𝐼𝐷:* ${yt_play[0].videoId}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝑇𝑖𝑝𝑜:* ${yt_play[0].type}
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *𝐿𝑖𝑛𝑘:* ${yt_play[0].url}\n
 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 𖤍 *_Enviando ${additionalText}, esperé un momento por favor．．．_*`.trim();
    conn.sendMessage(m.chat, {image: {url: yt_play[0].thumbnail}, caption: texto1}, {quoted: m});
    if (command == 'play') {
    try {    
    const q = '128kbps';
    const v = yt_play[0].url;
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size_Api = await yt?.size;
    const sizeApi = size_Api?.replace('MB', '')?.replace('GB', '')?.replace('KB', '')   
    const sex = await getBuffer(dl_url)
    const fileSizeInBytes = sex.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const size = fileSizeInMB.toFixed(2);    
    if (size >= limit_a2) {  
    await conn.sendMessage(m.chat, {text: `*[ ✔ ] Descargue su audio en ${dl_url}*`}, {quoted: m});
    return;    
    }     
    if (size >= limit_a1 && size <= limit_a2) {  
    await conn.sendMessage(m.chat, {document: sex, mimetype: 'audio/mpeg', fileName: ttl + `.mp3`}, {quoted: m});   
    return;
    } else {
    await conn.sendMessage(m.chat, {audio: sex, mimetype: 'audio/mpeg', fileName: ttl + `.mp3`}, {quoted: m});   
    return    
    }} catch {
    try {      
    let info = await ytdl.getInfo(yt_play[0].videoId);
    let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    let buff = ytdl.downloadFromInfo(info, { format: format });
    let bufs = []
        buff.on('data', chunk => { bufs.push(chunk) })
        buff.on('end', async () => {
    let buff = Buffer.concat(bufs)
    conn.sendMessage(m.chat, {audio: buff, fileName: yt_play[0].title + '.mp3', mimetype: 'audio/mpeg'}, {quoted: m});
    })} catch {
    await YTDL.mp3(yt_play[0].url).then(async (s) => {
    await conn.sendMessage(m.chat, {audio: fs.readFileSync(s.path), mimetype: "audio/mpeg", fileName: `${s.meta.title || "-"}.mp3`,}, {quoted: m});
    await fs.unlinkSync(s.path)});
    }
  }
}
    if (command == 'play2') {
    try {  
    const qu = '360';
    const q = qu + 'p';
    const v = yt_play[0].url;
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
    const dl_url = await yt.video[q].download();
    const ttl = await yt.title;
    const size_Api = await yt?.size;
    const sizeApi = size_Api?.replace('MB', '')?.replace('GB', '')?.replace('KB', '')   
    const sex = await getBuffer(dl_url)
    const fileSizeInBytes = sex.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const size = fileSizeInMB.toFixed(2);    
    if (size >= limit2) {  
    await conn.sendMessage(m.chat, {text: `*[ ✅ ] 𝐷𝑒𝑠𝑐𝑎𝑟𝑔𝑢𝑒 𝑠𝑢 𝑣𝑖𝑑𝑒𝑜 𝑒𝑛 ${dl_url}*`}, {quoted: m});
    return;    
    }     
    if (size >= limit1 && size <= limit2) {  
    await conn.sendMessage(m.chat, {document: sex, mimetype: 'video/mp4', fileName: ttl + `.mp4`}, {quoted: m});   
    return;
    } else {
    await conn.sendMessage(m.chat, {video: sex, mimetype: 'video/mp4', fileName: ttl + `.mp4`}, {quoted: m});   
    return;    
    }} catch {
    const formats = await bestFormat(yt_play[0].url, 'video');
    const buff = await getBuffer(formats.url);
    const ttl_1 = `${yt_play[0].title ? yt_play[0].title : 'Tu_video_descargado'}`;
    const fileSizeInBytes = buff.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
    await conn.sendMessage(m.chat, {video: buff, fileName: ttl_1 + '.mp4', mimetype: 'video/mp4'}, {quoted: m});
    }      
  }
} catch (error) {
    console.log(error)
    throw '*[❌] Error, por favor vuelva a intentarlo.*';
  }
};
handler.help = ['play', 'play2'].map((v) => v + ' < busqueda >');
handler.tags = ['downloader'];
handler.command = /^(play|play2)$/i;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

const getBuffer = async (url, options) => {
    options ? options : {};
    const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1,}, ...options, responseType: 'arraybuffer'});
    return res.data;
};
