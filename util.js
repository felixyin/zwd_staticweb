function getCollNameFromPath(filep,actionName) {
    let name1 = filep.split('/api/data/')[1].toString();
    return name1.replace('/', '_').replace('/', '_').replace(actionName, '');
}

function _S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (_S4() + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + _S4() + _S4());
}
exports.getCollNameFromPath = getCollNameFromPath;
exports.guid = guid;
