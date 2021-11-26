const express = require('express');
const questions = require('./questions.json');

const quiz = express();

//Serve static content
quiz.use(express.static('static'));

quiz.use(express.urlencoded({
        extended: true
    }));

//Handling quiz page
quiz.post('/quiz', (req,res) => {
    
});

quiz.listen(2000);   //Currently listening on port 2000