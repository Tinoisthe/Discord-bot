module.exports = {
    name: 'join',
    description: "joins!",
    execute(client, message, args, Discord){

const channel = client.channels.cache.get("880705489372053504");
if (!channel) return console.error("The channel does not exist!");
channel.join().then(connection => {
  // Yay, it worked!
  console.log("Successfully connected.");
}).catch(e => {
  // Oh no, it errored! Let's log it to console :)
  console.error(e);
})}}