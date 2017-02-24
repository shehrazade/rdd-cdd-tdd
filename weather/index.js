'use strict';

/* Usage of Yahoo Query Language */
const YQL = require('yql');
const _ = require('lodash');

module.exports = (opts, callback) => {
	opts = opts || [];

	let query;
	/* Interrogation of Yahoo database to get the weather with default parameters or input ones */
	if (_.isEmpty(opts)) {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Dhaka, Bangladesh")');
	} else {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + opts[0] + ', ' + opts[1] + '")');
	}

	query.exec((err, response) => {
		if (err) {
			return callback(err);
		}

		callback(null, response);
	});
};
