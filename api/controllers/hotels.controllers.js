/* Bazoume kai bash me ta hotel ston controller */
var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Energeia */
module.exports.hotelsGetAll = function(req, res) {

	var db = dbconn.get();
	/* Mesa sthn bash sthn db hotels orisoume to collection hotels
	 kai epilegoume to tech (mesa sthn collection) */
	var collection = db.collection('tech');

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}
	/* me to skip orizoume how many object we skip and return to 
	the browser the max count pou sthn prokeimenh periptwsh einai 5 */
	collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function(err, docs) {
			console.log("found hotels", docs);
			res
				.status(200)
				.json(docs);
		});
};

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Allh Energeia */
module.exports.hotelsGetOne  = function(req, res) {

	var db = dbconn.get();
	/* Mesa sthn bash sthn db hotels orisoume to collection hotels
	 kai epilegoume to tech (mesa sthn collection) */
	var collection = db.collection('tech');

	var hotelId = req.params.hotelId;
	console.log("Get hotelId", hotelId);

	/* We try to query the json file with the hotelId in the broswer
	 etc http://localhost:3000/api/hotels/5b335270f14ed6d1e57af8b7 
	 kai pairnoume _id kai olo to query tou hotel pou orisame sto url */
	collection
		.findOne({
			_id : ObjectId(hotelId)
		}, function(err, doc) {
			res
			.status(200)
			.json( doc );
		});	
};

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Allh mia energeia */
module.exports.hotelsAddOne = function(req, res) {

	var db = dbconn.get();
	/* Mesa sthn bash sthn db hotels orisoume to collection hotels
	 kai epilegoume to tech (mesa sthn collection) */
	var collection = db.collection('tech');
	var newHotel;

	console.log("POST New hotel");

	/* Orisoume to an to new hotel exei body kai exei name kai exei stars
	tote mporoume na to prosresoume sthn bash mas 
	An den plhrei autes tis propotheseis (else) tote bgasoume error 400 (bad request)*/
	if (req.body && req.body.name && req.body.stars) {
		newHotel = req.body;
		/* Osisoume stars property ws int epeidh 
		alliws tha thn parei san string */
		newHotel.stars = parseInt(req.body.stars, 10);
		console.log(newHotel);
		/* Twra tha baloume to new hotel sthn bash mas */
		collection.insertOne(newHotel, function(err, response) {
			console.log(response);
			console.log(response.ops);
			res
				.status(201)
				.json(response);
		});
		
	} else {
		console.log("Data missing from body");
		res
			.status(400)
			.json({ message : "Required data missing from body" });
	}
};