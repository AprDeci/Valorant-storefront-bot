const sharp = require('sharp')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const background = sharp(path.join(__dirname,'img/background.png'))
//获取网络图片buffer
async function getimg(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    return buffer;
  } catch (error) {
    throw new Error('下载图片时发生错误：' + error.message);
  }
}

async function shopimg(img1,img2,img3,img4,wname){
//拉伸图片
var imgbuffer1=await getimg(img1)
var image1 = await sharp(imgbuffer1).resize({height:128,width:512,fit:"contain",background:{ r: 255, g: 255, b: 255, alpha: 0}}).toBuffer()
var imgbuffer2=await getimg(img2)
var image2 = await sharp(imgbuffer2).resize({height:128,width:512,fit:"contain",background:{ r: 255, g: 255, b: 255, alpha: 0}}).toBuffer()
var imgbuffer3=await getimg(img3)
var image3 = await sharp(imgbuffer3).resize({height:128,width:512,fit:"contain",background:{ r: 255, g: 255, b: 255, alpha: 0}}).toBuffer()
var imgbuffer4=await getimg(img4)
var image4 = await sharp(imgbuffer4).resize({height:128,width:512,fit:"contain",background:{ r: 255, g: 255, b: 255, alpha: 0}}).toBuffer()

const svgoptions = { x: 0, y: 0, fontSize: 21, anchor: "top", attributes: { fill: "white"} };
const wnamesvg1 = textToSVG.getSVG(wname[0], svgoptions);
const wnamesvg2 = textToSVG.getSVG(wname[1], svgoptions);
const wnamesvg3 = textToSVG.getSVG(wname[2], svgoptions);
const wnamesvg4 = textToSVG.getSVG(wname[3], svgoptions);


//将图片和背景拼接
const shopimgbuffer=await background
  .composite([
    { input: image1, blend:"over",left:0,top:10 },
    { input: image2, blend:"over",left:0,top:148 },
    { input: image3, blend:"over",left:0,top:286 },
    { input: image4, blend:"over",left:0,top:424 },
    {input:Buffer.from(wnamesvg1),blend:"over",left:15,top:108},
    {input:Buffer.from(wnamesvg2),blend:"over",left:15,top:246},
    {input:Buffer.from(wnamesvg3),blend:"over",left:15,top:384},
    {input:Buffer.from(wnamesvg4),blend:"over",left:15,top:522}
  ]) 
  .toBuffer()
  
  
  return shopimgbuffer
}

module.exports.shopimg = shopimg