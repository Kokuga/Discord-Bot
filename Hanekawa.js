//endroit des constantes
const Discord = require('discord.js');
const token = 'TOKEN';
const prefix = '*';
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const mysql = require("mysql");
const superagent = require("superagent");
const fs = require("fs");
const userUsed = new Set();


const userData = JSON.parse(fs.readFileSync("./userData.json", "utf8"));
//Endroit des classes

//Fin Classes


//endroit des fonctions


function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}))

  server.queue.shift();

  server.dispatcher.on("end", function() {
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
  })
}

function HexGenerator() {
  return '#' + Math.floor(Math.random()*1677215).toString(16); //1677215 = FFFFFF
}

function generationxp()
 {
   return 1;
 }

//fin endroit des fonctions

var bot = new Discord.Client();

// game = new DiscordGame(bot)
// game.handle()

// game.onMeme(user)

//Parametre BDD
let con = mysql.createConnection({
  host: "localhost",
  user : "root",
  password : "root",
  database: "bot"
});
//Fin parametre BDD
con.connect(err => {
  if(err) throw err;
  console.log("Connecté sur la base de donnée")
  con.query("show tables", console.log);
});
// game.increaseUserExperience(user)
// -> user.experience
// -> user.name



//Pour plusieurs serveurs
var servers = {};


bot.on("ready", function(){
  console.log("pret");
});


//Quand y'a un nouveau membre
bot.on("guildMemberAdd", function(message) {
  member.guild.channels.find("name", "general").sendMessage(member.toString() + "Bienviendu jeune padawan !");
})

bot.on('message', async message => {
  if (message.author.equals(bot.user)) return;

  let username = message.member.user.tag;
  let random_poisson = Math.floor((Math.random() * 100) + 1);
  let random_travail = Math.floor((Math.random() * 1000) + 50);
  let sender = message.author;




  sqll = `SELECT xp FROM xp WHERE id=${message.author.id}`;
  class DiscordClient {


    constructor(bot, id) {
      this.discord = bot

    }

    getUserExperience(userId) {
      return con.query(sqll) || 0 //Ou mettre un select
    }
  }

  const game = new DiscordClient(bot);


  var experience = game.getUserExperience(sender.id)

  if(!userData[sender.id]) {
    userData[sender.id] = {money: 100}
  }

  if(message.content.startsWith(`${prefix}meme`)) {
    let {body} = await superagent.get('https://api-to.get-a.life/meme')

    let memeEmbed = new Discord.RichEmbed()
    .setAuthor('Hanekawa.Meme')
    .setColor("#FFFFFF")
    .setImage(body.url)

    message.channel.send(memeEmbed)
    message.delete()
  }
  //Expérience
  con.query(`SELECT * FROM xp WHERE id = ${sender.id}`, (err, rows) => {
    if(err) throw err;

    let sql;

    if(rows.length < 1){
      sql = `INSERT INTO xp (id,username,xp) VALUES ('${sender.id}','${username}',${generationxp()})`
    } else {
      let xp = rows[0].xp;

      sql = `UPDATE xp SET xp = ${xp + generationxp()} WHERE id = '${sender.id}'`;

         if (message.content === prefix + "xp"){
           var xp_embed = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`Expérience de ${username}`)
           .setThumbnail(sender.avatarURL)
           .addField(`Expérience : ${experience}` , "-------------------------------")
           .setTimestamp()
           message.channel.send(xp_embed);
       }
    }
    con.query(sql);
  });
  //Fin Expérience

      if(message.content.startsWith(`${prefix}argent`)) {
      var argent_embed = new Discord.RichEmbed()

      .setTitle(`:tools: Voici mes commandes pour l'argent !`)
      .setThumbnail(sender.avatarURL)
      .addField("`compte`", "pour voir l'argent sur ton compte")
      .addField("`daily`", "pour avoir 500 crédits sur ton compte. Temps d'attente : 24h")
      .addField("`poisson`", "**ur avoir des crédits sur ton compte. Temps d'attente : 10 secondes")
      .addField("`travail`", "pour avoir des crédits sur ton compte. Temps d'attente : 30 mins")
      .setTimestamp()
      message.channel.send(argent_embed);
    }

    if(message.content.startsWith(`${prefix}daily`)) {
      if (userUsed.has(sender.id)) {
        return message.channel.send(`Ce n'est pas encore l'heure de recolter ton argent du jour !`);
      } else {
        userUsed.add(sender.id);
        setTimeout(() => {
          userUsed.delete(sender.id);
        }, 24 * 60 * 60 * 1000)

        message.channel.send(":moneybag: | Tu as recu `**500**` crédits !");
        userData[sender.id].money += 500;

      }
    }

    if(message.content.startsWith(`${prefix}poisson`)) {
      if (userUsed.has(sender.id)) {
        return message.channel.send(`Ce n'est pas encore l'heure de pecher !`);
      } else {
        userUsed.add(sender.id);
        setTimeout(() => {
          userUsed.delete(sender.id);
        }, 3 * 60)//180 secondes

        message.channel.send(`Tu as peché un poisson ! Voici ce que tu as gagné **${random_poisson}** crédits`);
        userData[sender.id].money += random_poisson;

      }
    }

    if(message.content.startsWith(`${prefix}travail`)) {
      if (userUsed.has(sender.id)) {
        return message.channel.send(`Ce n'est pas encore l'heure de travailler !`);
      } else {
        userUsed.add(sender.id);
        setTimeout(() => {
          userUsed.delete(sender.id);
        }, 30 * 60)//30 minutes

        message.channel.send(`Voici ce que tu as eu en travaillé toute la semaine : **${random_travail}** crédits`);
        userData[sender.id].money += random_travail;

      }
    }


if(message.content.startsWith(`${prefix}compte`)) {
  var compte_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`Banque`)
    .setThumbnail(sender.avatarURL)
    .addField(`Compte de ${username}`,`-------------------------`)
    .addField(`Votre argent : ${userData[sender.id].money}`, `------------------------------`)
    .setTimestamp()
    message.channel.send(compte_embed);
}

fs.writeFile("./userData.json", JSON.stringify(userData), (err) => {
  if(err) console.error(err);
})

})

bot.on("message", function(message){
  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(prefix)) return;


  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {

    case "ping":
      message.channel.sendMessage("Pong! Le bot a repondu en " + Math.round(bot.ping)+ " ms");
      break;

    case "info":
      message.channel.sendMessage("Je suis un bot créé par Kokuga");
      break;

    case "prefix":
      message.channel.sendMessage('Le prefix est **`*`**');
      break;

    case "help":
      var helpEmbed = new Discord.RichEmbed()
        .setTitle("Commandes générales")
        .addField("`help`", "Voir les commandes")
        .addField("`ping`", "Voir le temps de reponse du bot")
        .addField("`info`", "Voir mes informations")
        .addField("`regarde`", "Test de la reactivité du bot")
        .addField("`musique`", "Voir les commandes de la musique")
        .setColor("Random")
        .setFooter("Hanekawa Bot")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
      message.channel.sendEmbed(helpEmbed);
      break;

      case "musique":
      var musicEmbed = new Discord.RichEmbed()
        .setTitle("Commandes musicales")
        .addField("`play`", "Lance le bot musique. Il faut suivre d'un URL pour que le bot fonctionne")
        .addField("`skip`", "Passe la musique actuelle pour la prochaine")
        .addField("`stop`", "Arrete le bot de faire de la musique")
        .setColor("Random")
        .setFooter("Hanekawa Bot")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
      message.channel.sendEmbed(musicEmbed);
      break;

    case "regarde":
      message.channel.sendMessage(message.author.toString() + " I see you")
      break;
    //Musique
    case "play":
      if(!args[1]) {//Voir si l'argument existe
        message.channel.sendMessage("Mettez un lien youtube !");
        return;
      }

      if(!message.member.voiceChannel){//voir si le user est dans un chat vocal
        message.channel.sendMessage("Vous devez etre dans un chat vocal !")
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      };

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);

      });
        break;

      case "skip":
        var server = servers[message.guild.id];

        if(server.dispatcher) server.dispatcher.end();
        break;

      case "stop":
        var server = servers[message.guild.id];

        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
      //fin Musique


  }
});




bot.login(token);
