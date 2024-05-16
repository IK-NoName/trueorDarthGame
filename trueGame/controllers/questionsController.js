const path = require('path');
const QUESTIONS = require(path.join(__dirname + '/libs/questions.js'));

const getQuestionsREQUEST = (req, res) => {
	res.send(QUESTIONS.getQuestions());
};

const addQuestionsREQUEST = (req, res) => {
	console.log(req.params.question);
	QUESTIONS.addQuestion(req.params.question, req.params.truthOrDare);
	res.send(true);
};

module.exports = { getQuestionsREQUEST, addQuestionsREQUEST };
