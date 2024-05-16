const path = require('path');
const fs = require('fs');
const questions = JSON.parse(
	fs.readFileSync(path.join(__dirname + '/../stockage/questions.json')),
	'utf8'
);

const getQuestions = () => {
	return questions.questions;
};

const addQuestion = (question, truthOrDare) => {
	if (truthOrDare === 'true') {
		questions.questions.push({
			question: question,
			type: true,
		});
	} else {
		questions.questions.push({
			question: question,
			type: false,
		});
	}

	fs.writeFileSync(
		path.join(__dirname + '/../stockage/questions.json'),
		JSON.stringify(questions)
	);
	return true;
};

module.exports = {
	getQuestions,
	addQuestion,
};
