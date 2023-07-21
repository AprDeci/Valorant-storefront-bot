// import modules
require('dotenv').config()
const storeimg = require("./src/storeimg.js")
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const tgbot = require('node-telegram-bot-api');
const tgbottoken = process.env.TOKEN
const bot = new tgbot(tgbottoken,{polling:true})
const express = require('express');
const bodyParser = require('body-parser');
const client = new API(Regions.AP);
const content = new ContentAPI(Languages.Chinese_Traditional);
const schedul = require("node-schedule")
const url = process.env.URL
const port = process.env.PORT
const username = process.env.User
const password = process.env.PASSWORD
client.user_agent = "RiotClient/67.0.8.154.1064 %s (Windows;10;;Professional, x64)"
client.client_version = "release-07.01-shipping-17-917901"


  //初始化webhook
  bot.setWebHook(`${url}/bot${tgbottoken}`)
  const app = express();
  app.use(bodyParser.json());
  app.get('/', (req, res) => res.send('Valorant-storefront-bot'));
  app.post(`/bot${tgbottoken}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
  app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});
    
    ///shop命令查询每日商店
    bot.onText(/\/shop/,(msg)=>{
      console.log("/shop查询")
      senditeminfo(msg.chat.id)
    })

    

    //定时发送每日商店 在服务器使用改为 01 1 * * *
    const everyStoreFront = schedul.scheduleJob('01 8 * * *',()=>{
      senditeminfo(1949366681)
    })


function senditeminfo(chatid){
  client.authorize(username,password).then(() => {
    client.getPlayerStoreFront(client.user_id).then(async (response) => {
      //获取每日商店武器uuid
        const item1 = await content.getWeaponSkinLevelByUuid(
          response.data.SkinsPanelLayout.SingleItemOffers[0]
      );
      const item2 = await content.getWeaponSkinLevelByUuid(
        response.data.SkinsPanelLayout.SingleItemOffers[1]
    );
      const item3 = await content.getWeaponSkinLevelByUuid(
        response.data.SkinsPanelLayout.SingleItemOffers[2]
  );
      const item4 = await content.getWeaponSkinLevelByUuid(
         response.data.SkinsPanelLayout.SingleItemOffers[3]
  );
  await bot.sendMessage(chatid,item1.displayName+'\r\n'+item2.displayName+'\r\n'+item3.displayName+'\r\n'+item4.displayName)
  storeimg.shopimg(item1.displayIcon,item2.displayIcon,item3.displayIcon,item4.displayIcon)
  bot.sendPhoto(chatid,__dirname+"\\src\\img\\shopimg.png");
},
    )}
  )}
