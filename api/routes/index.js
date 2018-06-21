var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

/* O xrhsths epikoinwnei me thn bohtheia twn Views apo gia na ta xreiaziristei xrhsimopoiei ton Controllers */
router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne);

router
	.route('/hotels/new')
	.post(ctrlHotels.hotelsAddOne);


module.exports = router;