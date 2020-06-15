// 读取测试目录json保存mongodb数据库
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const pjson = require('../package.json');
const util = require('../util');
const MongoClient = require('mongodb').MongoClient;

var url = pjson.mongoUrl;
let projectName = pjson.name;

let filePath = path.resolve(pjson.dataPath);

// console.log(filePath);
let json_list = [];
//调用文件遍历方法
fileDisplay(filePath);
// console.log(json_list);

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(projectName);

    json_list.forEach(function (filep) {
        let jsonStr = fs.readFileSync(filep,'utf-8')
        let jsonObj = JSON.parse(jsonStr);
        let table_data = jsonObj.resultData.data;
        let table_name = util.getCollNameFromPath(filep,'/list.json');

        const collection = dbo.collection(table_name);
        collection.insertMany(table_data, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted " + result.result.n + " documents into the " + table_name + " collection");
        });
    });
});

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath);
    // console.log(files)

    //遍历读取到的文件列表
    files.forEach(function (filename) {
        if (filename === '.DS_Store' || filename.indexOf('home.') !== -1 || filename.indexOf('_menu') !== -1 || filename.indexOf('.del') !== -1) return;
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir);
        let isFile = stats.isFile();//是文件
        let isDir = stats.isDirectory();//是文件夹
        if (isFile) {
            json_list.push(filedir);
            // console.log(filedir);
        }
        if (isDir) {
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });

}