const redis = require('redis'),
    //默认端口
    port = 6379,
    host = '127.0.0.1',
    password = '123456',
    client = redis.createClient(port, host);

//输入连接密码
client.auth(password, () => {
    console.log('ok');
});

function setKey(key, value, callback) {
//连接后要做的事
    client.on('connect', () => {
        client.set(key, value, callback);
        /*client.get('key',(error,reply)=>{
            if (reply){
                console.log(reply);
            }
        });*/
    });
}

function getKey(key, callback) {
    //连接后要做的事
    client.on('connect', () => {
        client.get(key, callback);
    });
}

function hashSet(hash, key, value, callback) {
    //连接后要做的事
    client.on('connect', () => {
        client.hset(hash, key, value, callback);
    });
}
function hashGet(hash, key,  callback) {
    //连接后要做的事
    client.on('connect', () => {
        client.hget(hash, key,callback);
    });
}

function hashGetAll(hash,callback){
    client.on('connect', () => {
        client.hgetall(hash,callback);
    });
}
/*hashSet('map1','key1','setHash',(error,replay)=>{
    replay?console.log(replay):console.log(error);
});*/
hashGet('map1','key1',(error,replay)=>{
    replay?console.log(replay):console.log(error);
});
hashGetAll('map1',(error,replay)=>{
    replay?console.log(replay):console.log(error);
});
module.exports = {setKey, getKey};
