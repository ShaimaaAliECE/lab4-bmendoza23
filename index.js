const questions = require('./questions.json');      //importing questions json file
const express = require('express');

const app = express();

//Serve static content
app.use(express.static('static'));

app.use(express.urlencoded({
        extended: true
    }));

//Handling quiz page
app.post('/quiz', (req,res) => {
    
});

app.listen(2000);   //Currently listening on port 2000