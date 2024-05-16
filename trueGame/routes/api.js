const express = require('express');
const router = express.Router();
const path = require('path');
const questionsControllers = require(path.join(
	__dirname + '/../controllers/questionsController'
));

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/getQuestions', (req, res, next) => {
	console.log('running...');
	try {
		questionsControllers.getQuestionsREQUEST(req, res);
	} catch (err) {
		console.log(err);
	}
});

router.get('/addQuestion/:question/:truthOrDare', (req, res, next) => {
	console.log('running...');
	try {
		questionsControllers.addQuestionsREQUEST(req, res);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
