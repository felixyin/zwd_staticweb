const MongoClient = require('mongodb').MongoClient;
const pjson = require('./package.json');

function mongo(callback) {
    MongoClient.connect(pjson.mongoUrl, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(pjson.name);
        await callback(dbo, db); // db 必须传入数据操作完毕后才能关闭，nodejs时异步执行的
    });
}

exports.mongo = mongo