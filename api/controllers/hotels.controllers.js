var hotelData = require('../data/hotel-data.json');

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Energeia */
module.exports.hotelsGetAll = function(req, res) {
	console.log("Get the hotels");
	console.log(req.query);

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	var returnData = hotelData.slice(offset,offset+count);

		res
			.status(200)
			.json( returnData );
};

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Allh Energeia */
module.exports.hotelsGetOne  = function(req, res) {
	var hotelId = req.params.hotelId;
	var thisHotel = hotelData[hotelId];
	console.log("Get hotelId", hotelId);
		res
			.status(200)
			.json( thisHotel );
};

/* Syntonisoume tis energeies pou tha kanei o controller */
/* Allh mia energeia */
module.exports.hotelsAddOne = function(req, res) {
	console.log("POST New hotel");
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};