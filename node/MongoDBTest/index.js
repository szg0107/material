const mongo = require('mongodb').MongoClient,
    url = 'mongodb://127.0.0.1:27017/school';

//插入数据 集合 插入对象 回调函数
function insert(collection,obj,callback) {
//连接数据库
    mongo.connect(url, (error, db) => {
        if (db) {
            // console.log(db);
            const dataBase = db.db('school');
            //创建集合
            // dataBase.createCollection("teacher",(error,res)=>{});
            //插入单条数据
            dataBase.collection(collection).insertOne(obj,callback);
            db.close();
        } else {
            console.log(error)
        }
    });
}

//插入多条数据
function insertMany(collection,objArray,callback) {
//连接数据库
    mongo.connect(url, (error, db) => {
        if (db) {
            const dataBase = db.db('school');
            //插入多条数据
            dataBase.collection(collection).insertMany(objArray,callback);
            db.close();
        } else {
            console.log(error)
        }
    });
}

//按条件查询
function find(collection,where,callback){
    //连接数据库
    mongo.connect(url, (error, db) => {
        if (db) {
            const dataBase = db.db('school');
            //查询所有数据并将结果转换为数组
            dataBase.collection(collection).find(where).toArray(callback);
            db.close();
        } else {
            console.log(error)
        }
    });
}

//按条件修改单条数据
function update(collection,where,update,callback){
    //连接数据库
    mongo.connect(url, (error, db) => {
        if (db) {
            const dataBase = db.db('school');
            //查询所有数据并将结果转换为数组
            dataBase.collection(collection).updateOne(where,update,callback);
            db.close();
        } else {
            console.log(error)
        }
    });
}

//按条件删除单条数据
function deleteData(collection,where,callback){
    //连接数据库
    mongo.connect(url, (error, db) => {
        if (db) {
            const dataBase = db.db('school');
            //查询所有数据并将结果转换为数组
            dataBase.collection(collection).deleteOne(where,callback);
            db.close();
        } else {
            console.log(error)
        }
    });
}

module.exports.insert=insert;
module.exports.find=find;
module.exports.update=update;
module.exports.deleteData=deleteData;
