/* eslint-disable consistent-return */

module.exports.run = async (client, message) => {
  if (!message.guild || !message.guild.available) return;
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes('no u')) {
    if (client.nou[message.author.id]) client.nou[message.author.id] += 1;
    else client.nou[message.author.id] = 1;
  }
  if (message.guild.id === client.config.officialserver) client.functions.get('checkLOA').run(message);

  const automod = client.functions.get('automod').run(message);
  if (automod === 'flood') return message.delete();

  if (!message.content.startsWith(client.config.prefix) || message.content === client.config.prefix) return;

  const args = message.content.slice(client.config.prefix.length).split(/ +/g);
  const cmd = args[0].toLowerCase();

  if ((/(?:https?:\/\/)?discord(?:app.com\/invite|.gg)\/[\w\d]+/gi).test(message.content) &&
      message.channel.permissionsFor(client.user).has('MANAGE_MESSAGES') &&
      !client.config.owners.includes(message.author.id) &&
      message.guild.id === client.config.officialserver) return message.delete();

  if (!client.commands.has(cmd)) return;

  if (client.user.presence.status === 'idle') client.user.setStatus('online');
  else clearTimeout(client.timeout);
  client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

  const info = client.commands.get(cmd);
  if (info.help.venom && message.guild.id === client.config.officialserver) info.run(client, message, args);
  else if (!info.help.venom) info.run(client, message, args);
};
