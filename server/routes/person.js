var express = require('express');
var router = express.Router();
var personModel = require('./../models/person');

/* GET household listing. */
router.get('/', function(req, res, next) {
	console.log('WITHOUT ID');
	personModel.get.all().then(function(response) {
		res.json(response);
	}, function(err) {
		res.status(404).json({
			error:err
		});
	});
});

router.get('/:id', function(req, res, next) {
	console.log('with id');
	if(req.params.id === void(0)) {
		res.status(404).json({
			error:'missing parameter id'
		});
	} else {
		personModel.get.single(req.params.id).then(function(response) {
			res.json(response);
		}, function(err) {
			res.status(404).json({
				error:err
			});
		});
	}
});

var validateParameters = function(params, type) {
	return new Promise(function(resolve, reject) {
		var requiredFields = ['first_name', 'last_name', 'email', 'age', 'gender'],
			valid = true,
			values = [],
			count=0;

		requiredFields.map(function(field) {
			if(!(field in params)) {
				valid = false;
			} else {
				if(type === 'put') {
					values.push({value:params[field], field:field});
				} else {
					values.push(params[field]);
				}
			}
			count++;
		});

		if(count === requiredFields.length) {
			resolve({valid:valid, values:values});
		}
	});
}

router.post('/', function(req, res, next) {
	if(typeof(req.body) === 'object' && Object.keys(req.body).length > 0) {
		validateParameters(req.body, 'post').then(function(response) {
			if(!response.valid) {
				res.status(404).json({
					error:'invalid parameteres'
				});
			} else {
				personModel.post(response.values).then(function(response) {
					req.body.id = response[0].id;
					res.json(req.body);
				}, function(err) {
					res.status(404).json({
						error:err
					});
				});
			}
		});
	} else {
		res.status(404).json({
			error:'invalid body content'
		});
	}
});

router.put('/', function(req, res, next) {
	if(typeof(req.body) === 'object' && Object.keys(req.body).length > 0 && 'id' in req.body) {
		var id = req.body.id;
		delete req.body.id;
		validateParameters(req.body, 'put').then(function(response) {
			if(!response.valid) {
				res.status(404).json({
					error:'invalid parameteres'
				});
			} else {
				personModel.put(id, response.values).then(function(response) {
					req.body.id = response[0].id;
					res.json(req.body);
				}, function(err) {
					res.status(404).json({
						error:err
					});
				});
			}
		});
	} else {
		res.status(404).json({
			error:'invalid body content'
		});
	}
});

router.delete('/:id', function(req, res, next) {
	if(req.params.id === void(0)) {
		res.status(404).json({
			error:'invalid parameters, id missing'
		});
	} else {
		personModel.delete(req.params.id).then(function(response) {
			res.json({id:req.params.id, deleted:response});
		}, function(err) {
			res.status(404).json({
				error:err
			});
		});
	}
});

module.exports = router;
