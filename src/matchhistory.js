const Valorant = require('@liamcottle/valorant.js');
const client = new Valorant.API(Valorant.Regions.AsiaPacific);
client.user_agent = "RiotClient/67.0.8.154.1064 %s (Windows;10;;Professional, x64)"
client.client_version = "release-07.01-shipping-17-917901"
require('dotenv').config()


const username = process.env.User
const password = process.env.PASSWORD
client.authorize("Aprte","luchen1122").then(()=>{
    client.getPlayerMatchHistory(client.user_id,0,5).then((response)=>{
        const History = response.data.History
        client.getMatch(History[3].MatchID).then((response)=>{
            console.log(response.data)
        })
    })
})