const { ShardingManager } = require('discord.js');
const { token, shards } = require("./config.json");

const manager = new ShardingManager('./bot_deploy.js', { token: token });

manager.on('shardCreate', shard => shard.on("ready", () => {
    console.log(`Shard ${shard.id} connected.`)
    // Sending the data to the shard.
    shard.send({type: "shardId", data: {shardId: shard.id}});
}))

manager.spawn({amount: shards, delay: 10000});