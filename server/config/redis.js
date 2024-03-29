const Redis = require('ioredis');
const redis = new Redis({
    port: 15605,
    host: 'redis-15605.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    username: 'default',
    password: 'dhu1BOfFFHczbzDqZQLdO5Fvjij1xMQW',
    db: 0
});

module.exports = {
    redis
}