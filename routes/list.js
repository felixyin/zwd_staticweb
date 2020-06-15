const express = require('express');
// const assert = require('assert');
const router = express.Router();
const db = require('../db');
const util = require('../util');

router.all('', function (req, res, next) {
    let param = req.query;
    let collName = util.getCollNameFromPath(req.baseUrl, '/list.json');
    let query = {};
    if (param.reqData) {
        let reqData = JSON.parse(param.reqData);
        let conditions = reqData.condition;
        for (let i = 0; i < conditions.length; i++) {
            let c = conditions[i];
            query[c.field] = new RegExp(".*" + c.keyword + ".*");
        }
    }
    db.mongo(async function (dbo, db) {
        const collection = dbo.collection(collName);

        let page = parseInt(param.page);
        let pageSize = parseInt(param.limit);
        let skip = pageSize * (page - 1);

        let cf = collection.find(query);
        let total = await cf.count();
        let totalPage = Math.ceil(total / pageSize);
        cf.skip(skip).limit(pageSize).toArray(function (err, rows) {
            // assert.equal(err, null);
            var pageJson = {
                "isAlert": false,
                "status": 200,
                "resultData": {
                    "total": total,
                    "data": rows,
                    // FIXME 下面参数可能统统没用，layui官方文档没有对此特殊要求
                    "totalPage": totalPage,
                    "hint": "",
                    "limit": pageSize,
                    "page": page,
                    "status": 200
                }
            };
            db.close();
            res.json(pageJson);
        });
    });
});

module.exports = router;
