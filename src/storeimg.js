const sharp = require('sharp')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
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

async function shopimg(img1,img2,img3,img4){

var imgbuffer1=await getimg(img1)
var image1 = await sharp(imgbuffer1).resize({height:128,width:512,fit:"contain"}).toBuffer()
var imgbuffer2=await getimg(img2)
var image2 = await sharp(imgbuffer2).resize({height:128,width:512,fit:"contain"}).toBuffer()
var imgbuffer3=await getimg(img3)
var image3 = await sharp(imgbuffer3).resize({height:128,width:512,fit:"contain"}).toBuffer()
var imgbuffer4=await getimg(img4)
var image4 = await sharp(imgbuffer4).resize({height:128,width:512,fit:"contain"}).toBuffer()


const shopimgbuffer=background
  .composite([
    { input: image1, blend:"add",left:0,top:10 },
    { input: image2, blend:"add",left:0,top:148 },
    { input: image3, blend:"add",left:0,top:286 },
    { input: image4, blend:"add",left:0,top:424 },
  ]) 
  .toBuffer()
  
  //.toFile(path.join(__dirname,'img/shopimg.png'));
  return shopimgbuffer
}

module.exports.shopimg = shopimg