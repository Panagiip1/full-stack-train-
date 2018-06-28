/* Edw kaloume thn bash mas kai to apothikeuoume stn metablhth MongoClient */
var MongoClient = require('mongodb').MongoClient;
/* Edw orizoume apo pou tha parei ta dedomena dld orisoume prwta to port ths bashs mas (./mongod)
 kai meta orizoume thn db pou dhmiousame mesa sto mongo shell (hotels) afou prin eixame kanei import sthn sto bin ths mongo bashs mas,
 to json file pou exei ta ksenodoxeia */
var dburl ='mongodb://localhost:27017/hotels';

var _connection = null;

var open = function() {
	MongoClient.connect(dburl, function(err, db) {
		if (err) {
			console.log("DB connection failed");
			return;
		}
		_connection = db;
		console.log("DB connection open", db);
	});
	// set _connection
};

var get = function() {
	return _connection;
};

module.exports = {
	open : open,
	get : get
};