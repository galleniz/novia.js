module.exports = async (client)=>{
    client.user.setPresence({ activities: [{ name: 'por ti.', type: 2}] });
	client.user.setStatus("idle")
	console.log("Novia.js is online!")
}