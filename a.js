// import modules
const { API, ContentAPI, Languages, Regions } = require("@liamcottle/valorant.js");
const tgbot = require('node-telegram-bot-api');
const tgbottoken = '5833380838:AAHp2hGKlVh3hqCOpOxpOm3Hohk9PH2EJVA'
const bot = new tgbot(tgbottoken,{polling:true})
const client = new API(Regions.AP);
const content = new ContentAPI(Languages.Chinese_Traditional);
client.user_agent = "RiotClient/58.0.0.4640299.4552318 %s (Windows;10;;Professional, x64)"
client.client_version = "release-05.06-shipping-6-765767"
// authorize using the ClientAPI
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

    // log item
    console.log(item1.displayName+'\r\n'+item2.displayName+'\r\n'+item3.displayName+'\r\n'+item4.displayName);
    senditeminfo(item1,item2,item3,item4)
    
    
    // 获取chatid.
    // bot.onText(/\/mychatid/,function(msg){
    //   var id = msg.chat.id
    //   bot.sendMessage(msg.chat.id,id)
    // })
  });
});

function senditeminfo(item1,item2,item3,item4){
  bot.sendMessage(1949366681,item1.displayName+'\r\n'+item2.displayName+'\r\n'+item3.displayName+'\r\n'+item4.displayName)
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
  ]
  bot.sendMediaGroup(1949366681,pictures)
}