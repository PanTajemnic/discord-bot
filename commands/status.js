const Discord = require('discord.js');
const uonetStatus = require('../utils/uonetStatus');

exports.run = async (client, message) => {
  message.channel.startTyping();

  let studentNewStatus = {};
  let studentOldStatus = {};
  try {
    studentNewStatus = await uonetStatus.checkService("https://uonetplus-uczen.vulcan.net.pl/warszawa", "Uczeń");
    studentOldStatus = await uonetStatus.checkService("https://uonetplus-opiekun.vulcan.net.pl/warszawa", "Uczeń");
  } catch (error) {
    console.error(error);
    message.channel.send(`Błąd: \`${error.message}\``);
    message.channel.stopTyping();
    return;
  }

  const statusColor = Math.max(studentNewStatus.code, studentOldStatus.code) === uonetStatus.STATUS_WORKING ? '2ecc71' : 'f1c40f';

  let studentNewMessage = 's';

  if (studentNewStatus.code === uonetStatus.STATUS_WORKING) studentNewMessage = ':white_check_mark: Wszystko powinno działać poprawnie';
  else if (studentNewStatus.code === uonetStatus.STATUS_ERROR) {
    studentNewMessage = studentNewStatus.message
      ? `:warning: Błąd: \`${studentNewStatus.message}\``
      : ':warning: Błąd sprawdzania statusu';
  } else if (studentNewStatus.code === uonetStatus.STATUS_TECHNICAL_BREAK) {
    studentNewMessage = '<:przerwa:537743331875225601> Przerwa techniczna';
  }

  let studentOldMessage = '';

  if (studentOldStatus.code === uonetStatus.STATUS_WORKING) studentOldMessage = ':white_check_mark: Wszystko powinno działać poprawnie';
  else if (studentOldStatus.code === uonetStatus.STATUS_ERROR) {
    studentOldMessage = studentOldStatus.message
      ? `:warning: Błąd: \`${studentOldStatus.message}\``
      : ':warning: Błąd sprawdzania statusu';
  } else if (studentOldStatus.code === uonetStatus.STATUS_TECHNICAL_BREAK) {
    studentOldMessage = '<:przerwa:537743331875225601> Przerwa techniczna';
  }

  const embed = new Discord.RichEmbed()
    .setTitle('Status dzienniczka')
    .setColor(statusColor)
    .addField('Nowy moduł uczeń:', studentNewMessage)
    .addField('Stary moduł uczeń:', studentOldMessage);

  if (Math.max(studentNewStatus.code, studentOldStatus.code) === uonetStatus.STATUS_WORKING) {
    embed.setImage('https://i.imgur.com/oBPbqmy.png');
  }

  message.channel.send({ embed });
  message.channel.stopTyping();
};
