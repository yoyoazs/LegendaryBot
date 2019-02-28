const Discord = require("discord.js");
const bot = new Discord.Client();
const apiController = require('./api-controller.js');
var prefix = ("l/");

bot.on(("ready"), ()=> {
    bot.user.setPresence({ game: { name: '[y/help] créé par yoyoazs77'}})
    console.log("☻Bot démarré !!☻")
});

bot.login("NTUwNDE2MzIzMzczNDMyODQx.D1iH-g.Wwu1wqXDJPgCMxCzs-Zp4ZN043c");

bot.on("message", message => {
    if (message.channel.type === "dm") 
        return;

if( message.author.bot)return;
var msg = message;

if(msg.content.startsWith(prefix + 'mute')){
  if(msg.channel.type === 'dm') return;
  if(!msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')){
  return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
  }
  if(msg.mentions.users.size === 0){
  return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez mute**")
  }
  if(!msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')){
  return msg.reply("**:x: Je n'ai pas la permission `MANAGE_MESSAGES` pour mute cet utilisateur**").catch(console.error);
  }
  let muteMember = msg.guild.member(msg.mentions.users.first());
  if(!muteMember){
  return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
  }
  msg.channel.overwritePermissions(muteMember, {SEND_MESSAGES: false}).then(member => {
  msg.channel.send(`:speak_no_evil: **${muteMember.displayName}** a bien été mute ! :speak_no_evil:`);
  })
  }
  if(msg.content.startsWith(prefix + 'unmute')){
  if(msg.channel.type === 'dm') return;
  if(!msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')){
  return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
  }
  if(msg.mentions.users.size === 0){
  return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez unmute**")
  }
  if(!msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')){
  return msg.reply("**:x: Je n'ai pas la permission `MANAGE_MESSAGES` pour unmute cet utilisateur**").catch(console.error);
  }
  let unmuteMember = msg.guild.member(msg.mentions.users.first());
  if(!unmuteMember){
  return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
  }
  msg.channel.overwritePermissions(unmuteMember, {SEND_MESSAGES: true}).then(member => {
  msg.channel.send(`:monkey_face: **${unmuteMember.displayName}** a bien été unmute ! :monkey_face:`);
  })
  }

if(msg.content.startsWith(prefix)){
    // Removes the ! from the command
    let command = msg.content.slice(2,msg.content.length)

    // Separate out the command from arguments
    let args = command.split(' ')
    command = args[0]
    args = args.slice(1, args.length)

    switch(command){
      case 'ftn':
        apiController.ftn(msg, args)
        break; 
        case "kick":
        message.delete()
  
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
          message.reply("Tu n'as pas le droit de kick ! :P")
        }else{
          var memberkick = message.mentions.members.first();
          if(!memberkick){
            message.reply("L'utilisateur n'exite pas !");
          }else{
            if(!message.guild.member(memberkick).kickable) {
              message.reply("L'utilisateur est imposible a kick !");
            }else{
              memberkick.guild.member(memberkick).kick().then((member) => {
              message.channel.send(`${member.displayName} a été kick !`);
            }).catch(() => {
              message.channel.send("Kick refusé !");
            })
          }
        }
        }
        break;
  
        case "ban":
        message.delete()
  
        if(memberban.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous ban.");
        
        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
          message.reply("Tu n'as pas le droit de ban ! :P")
        }else{
          var memberban = message.mentions.members.first();
          if(!memberban){
            message.reply("L'utilisateur n'exite pas !");
          }else{
            if(!message.guild.member(memberban).bannable) {
              message.reply("L'utilisateur est imposible a ban !");
            }else{
              memberban.guild.member(memberban).ban().then((member) => {
              message.channel.send(`${member.displayName} a été banni !`);
            }).catch(() => {
              message.channel.send("Ban refusé !");
            })
          }
        }
        }
        break;
  
    }
  }	

})
