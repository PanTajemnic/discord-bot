const Discord = require('discord.js');

exports.run = async (client, message) => {
  const testmessage = await message.channel.send('Sprawdzam...');
  const embed = new Discord.RichEmbed()
    .setTitle('PONG! :ping_pong:')
    .addField(`Udało mi się odpowiedzieć w ${testmessage.createdTimestamp - message.createdTimestamp}ms`, `Opóźnienie API wynosi ${client.ping}ms`)
    .setColor('F44336');
  testmessage.edit({ embed });
};
