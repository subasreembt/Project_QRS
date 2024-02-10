let ENV = 'DEV'; 
if (ENV == 'LOCAL') {
    module.exports.dbPort = "27017";
    module.exports.dbURL = "mongodb://127.0.0.1:27017/Education";
    module.exports.dbName = "Education";
} else if (ENV == 'DEV') {
    module.exports.dbPort = "27017";
    module.exports.dbURL = "mongodb+srv://gobinath:gobinath3@gobinath.xibawsy.mongodb.net/Suba";
    module.exports.dbName = "CONNECT";
}
