// import modules
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const tgbot = require('node-telegram-bot-api');
const tgbottoken = '5833380838:AAHp2hGKlVh3hqCOpOxpOm3Hohk9PH2EJVA'
const bot = new tgbot(tgbottoken,{polling:true})
const client = new API(Regions.AP);
const content = new ContentAPI(Languages.Chinese_Traditional);
const schedul = require("node-schedule")
client.user_agent = "RiotClient/67.0.8.154.1064 %s (Windows;10;;Professional, x64)"
client.client_version = "release-07.01-shipping-17-917901"
// authorize using the ClientAPI


  
    
    // 获取chatid.
    // bot.onText(/\/mychatid/,function(msg){
    //   var id = msg.chat.id
    //   bot.sendMessage(msg.chat.id,id)
    // })

    ///shop命令查询每日商店
    bot.onText(/\/shop/,function(){
      console.log("/shop查询")
      senditeminfo()
    })

    

    //定时发送每日商店
    const everyStoreFront = schedul.scheduleJob('01 8 * * *',function(){
      senditeminfo()
    })




function senditeminfo(){
  client.authorize("Aprte", "luchen1122").then(() => {
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
  await bot.sendMessage(1949366681,item1.displayName+'\r\n'+item2.displayName+'\r\n'+item3.displayName+'\r\n'+item4.displayName)
  pictures =[{
    type: "photo",
    media:item1.displayIcon,
  },
  {
    type: "photo",
    media:item2.displayIcon,
  },
  {
    type: "photo",
    media:item3.displayIcon,
  },
  {
    type: "photo",
    media:item4.displayIcon,
  }
  ],
  bot.sendMediaGroup(1949366681,pictures);
},
    )}
  )}
