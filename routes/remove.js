const express = require('express');
// const assert = require('assert');
const router = express.Router();
const db = require('../db');
const util = require('../util');

router.post('/', function (req, res, next) {
    let param = JSON.parse(req.body.request);
    let collName = util.getCollNameFromPath(req.baseUrl,'/remove.json');
    db.mongo(function (dbo, db) {
        const collection = dbo.collection(collName);
        collection.deleteOne({"id": param.id},  function (err, r) {
            // assert.equal(null, err);
            var json = {
                "icon": 6,
                "resultMsg": "删除成功",
                "status": 200
            };
            db.close();
            res.json(json);
        });
    });
});

module.exports = router;
