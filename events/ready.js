module.exports.run = client => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);

    const activities = [
      'you',
      '<users> Users'
    ];
    let step = 1;
    client.user.setActivity(activities[0]);
    setInterval(() => {
      client.user.setActivity(activities[step].replace('<users>', client.users.size), { type: 'WATCHING' });
      if (step === activities.length - 1) step === 0;
      else step += 1;
    }, 1000 * 60 * 10);
  });
};
