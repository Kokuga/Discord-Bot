const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require("fs");

const ascii = require("ascii-art");

var prefix = ".";

const ytdl = require('ytdl-core');

const userUsed = new Set();


const queue = new Map();

const mysql = require("mysql");


let random = Math.floor((Math.random() * 100) + 9);
let Random = Math.floor((Math.random() * 500) + 100);


var servers = {};

client.login("NTMwNzcyNzg2NzkzNDE0Njg2.DxEWCg.k7_9G_stCv9_P0Y7qK0qWmbbNXM");

client.on("ready", () => {

    console.log("Je suis prêt !");

});

//Quand y'a un nouveau membre
bot.on("guildMemberAdd", function(message) {
  member.guild.channels.find("name", "general").sendMessage(member.toString() + "Bienviendu jeune padawan !");

  member.addRole(member.guild.roles.find("name", "Ne connait pas Hanekawa"));

  member.guild.createRole({
    name: 'Hanekawa Powa',
    color: HexGenerator(),
    permission : []
  }).then(function(role) {
    member.addRole(role);
  })
});

function generationxp()
 {
   return 1;
 }

 let con = mysql.createConnection({
   host: "localhost",
   user : "root",
   password : "root",
   database: "bot"
 });

 con.connect(err => {
   if(err) throw err;
   console.log("Connecté sur la base de donnée")
   con.query("show tables", console.log);
 });



client.on('message', async message => {
  if (message.author.equals(client.user)) return;

  if(!message.content.substring(prefix)) return;

  let args = message.content.substring(prefix.length).split(" ");
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let username = message.member.user.tag;


//Systeme d'expérience

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
         .setThumbnail(message.author.avatarURL)
         .addField(`Expérience : ${xp}` , "-------------------------------")
         .setTimestamp()
         message.channel.send(xp_embed);
     }
  }
  con.query(sql);
});


//Fin Systeme d'experience

if(!userData[sender.id.username]) {
  userData[sender.id.username] = {money: 100}
}

if(message.content.startsWith(prefix)){
  if(userData[sender.id.username].money < 100){
    message.channel.send(`Attention ${sender}, il semble que vous n'ayez meme pas 100 crédits.\n il vous sera donc impossible de jouer a la roulette`)
  }
}

    if(message.content === "Bonjour"){
        message.reply("Salut");
        console.log('Le bot dit bonjour');
    }

    if(message.content === prefix +"help") {
      var aide_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:robot: Voici mes catégories d'aide !`)
      .setDescription(`Voici mes commandes disponible :`)
      .setThumbnail(message.author.avatarURL)
      .addField("`.argent`" , "**pour voir les commandes liés à l'argent !**")
      .addField("`.fun` ", "**pour voir mes commandes d'animation !**")
      .addField("`.info`", "**pour avoir les informations**")
      .setTimestamp()
      message.channel.send(aide_embed);
    }


    if(message.content === prefix + "fun") {
      var fun_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:tools: Voici mes commandes amusantes !`)
      .setThumbnail(message.author.avatarURL)
      .addField("Bonjour", "**Le bot répond !**")
      .addField("*stats", "**Le bot vous envoie des informations sur votre profil !**")
      .addField("*info", "**Donne des indormations sur le bot et le serveur !**")
      .setTimestamp()
      message.channel.send(fun_embed);
    }





//section Economie
    if(message.content === prefix + "argent") {
      var argent_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:tools: Voici mes commandes pour l'argent !`)
      .setThumbnail(message.author.avatarURL)
      .addField("`balance`", "pour voir l'argent sur ton compte")
      .addField("`daily`", "pour avoir 500 crédits sur ton compte. Temps d'attente : 24h")
      .addField("`poisson`", "pour avoir des crédits sur ton compte. Temps d'attente : 180 secondes")
      .addField("`travail`", "pour avoir des crédits sur ton compte. Temps d'attente : 30 minutes")
      .setTimestamp()
      message.channel.send(argent_embed);
    }


//Gagner de l'argent

    if (message.content === prefix + "daily") {
      if (userUsed.has(sender.id)) {
        return message.channel.send(`Ce n'est pas encore l'heure de recolter ton argent du jour !`);
      } else {
        userUsed.add(sender.id);
        setTimeout(() => {
          userUsed.delete(sender.id);
        }, 24 * 60 * 60 * 1000)

        message.channel.send(":moneybag: | Tu as recu 500 crédits !");
        //Mettre l'argent ici
      }
    }

  if (message.content === prefix + "poisson") {
    if(userUsed.has(sender.io)) {
      return message.channel.send("Ce n'est pas encore l'heure pour recolter du poisson !")
    } else {
      userUsed.add(sender.id);
      setTimeout(() => {
        userUsed.delete(sender.id);
      }, 10000)

      message.channel.send(`WoW, tu as attrapé ce poisson : :fish:. Voici ce que tu as gagné **${random} crédits**`);
      //Mettre l'argent ici
    }
  }

if (message.content === prefix + "travail") {
  if(userUsed.has(sender.io)) {
    return message.channel.send("Ce n'est pas encore l'heure de travailler, retourne dormir !")
  } else {
    userUsed.add(sender.id);
    setTimeout(() => {
      userUsed.delete(sender.id);
    }, 100000)

    message.channel.send(`Tu as travaillé pendant 8h. Tu as gagné **${Random} crédits**`);
    //Mettre l'argent ici

  }
}

if(message.content === prefix + "balance") {
  var balance_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`Banque`)
    .setThumbnail(message.author.avatarURL)
    .addField(`Compte de ${username}`,`-------------------------`)
    .addField(`Votre argent : ${userData[sender.id.username].money}`, `------------------------------`)
    .setTimestamp()
    message.channel.send(balance_embed);
}





//Fin Gagner de l'argent

//Magasin

  if(message.content === prefix + "magasin") {
    var magasin_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:tools: Voici les produits disponibles !`)
      .addField("Pour acheter : ", "**.acheter [produit]**")
      .setThumbnail(message.author.avatarURL)
      .addField("Produit1", "**Produit1 + `prix`**")
      .addField("Produit2", "**Produit2 + `prix`**")
      .addField("Produit3", "**Produit3 + `prix`**")
      .addField("Produit4", "**Produit4 + `prix`**")
      .setTimestamp()
      message.channel.send(magasin_embed);
    }

  if(message.content === prefix + "acheter produit1"){
    if(userData[sender.id.username].money >= 250) {
      userData[sender.id.username].money -= 250;
      message.channel.send("Vous avez acheté 'Produit1' voici votre argent restant" + userData[sender.id.username].money)
    } else {
      message.channel.send("Vous n'avez pas assez d'argent pour acheter 'Produit1' !")
    }
  }

  if(message.content === prefix + "acheter produit2"){
    if(userData[sender.id.username].money >= 300) {
      userData[sender.id.username].money -= 300;
      message.channel.send("Vous avez acheté 'Produit2' voici votre argent restant" + userData[sender.id.username].money)
    } else {
      message.channel.send("Vous n'avez pas assez d'argent pour acheter 'Produit2' !")
    }
  }

  if(message.content === prefix + "acheter produit3"){
    if(userData[sender.id.username].money >= 400) {
      userData[sender.id.username].money -= 400;
      message.channel.send("Vous avez acheté 'Produit3' voici votre argent restant" + userData[sender.id.username].money)
    } else {
      message.channel.send("Vous n'avez pas assez d'argent pour acheter 'Produit3' !")
    }
  }

  if(message.content === prefix + "acheter produit4"){
    if(userData[sender.id.username].money >= 1000) {
      userData[sender.id.username].money -= 1000;
      message.channel.send("Vous avez acheté 'Produit4' voici votre argent restant" + userData[sender.id.username].money)
    } else {
      message.channel.send("Vous n'avez pas assez d'argent pour acheter 'Produit4' !")
    }
  }


//Fin Magasin


    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {

        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#6699FF")
        .setTitle(`Statistiques du joueurs : ${message.author.username}`)
        .addField(`ID du joueurs :id:`, msgauthor, true)
        .addField(`Date d'inscription du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés !")
        message.author.send(stats_embed);

        break;


    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de catégories et de salons", message.guild.channels.size)
        message.channel.sendMessage(info_embed)
        console.log("Un utilisateur a effectué la commande d'info !")
    }

}
})
