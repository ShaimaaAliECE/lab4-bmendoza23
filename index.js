//Server-side code

const express = require('express');
const questions = require('./questions.json');

const quiz = express();

//Serve static content
quiz.use(express.static("static"));

//Posts form data
quiz.use(express.urlencoded({
        extended: true
    }));

//Handles JSON
quiz.use(express.json());

quiz.get("/questions", (req,res) =>
    {
        res.json(questions); //Parses JSON as string, sends the string as a response
    }
);

quiz.post("/mark", (req,res) =>
    {
        const userChoice    = req.body["id"];  //Format of user's choice (in quiz.js as q#a#)
        const questionNum   = +userChoice[1];  //Second character in string (q_) is question number, converts to a number
        const answerNum     = +userChoice[3];  //Fourth character in strung (a_) is answer number, converts to number
    
        //Checking questions JSON for correct answer
        let feedback =
            questions[questionNum - 1]["answerIndex"] === answerNum - 1
            ? "Correct!" : "Incorrect";
            
        res.send(feedback);   //Sending correct answer in the response
    }
);

quiz.post("/submit", (req,res) =>
    {
        const totQs = questions.length; //Variable to hold total length of questions JSON object
        let correct = [];               //Array to hold correct answers
        let mark   = 0;                //Variable will hold user correct answer mark
    
        //Looping over all questions in JSON object
        questions.forEach((q) =>
            {
                correct.push(q["answerIndex"]); //Pushing correct answers into correct array
            }
        );

        //Loop over all question
        for(let i = 0; i<totQs; i++)
        {
            //Check if radio button answer (radio button name) is same as the given correct answer in the questions JSON
            if(req.body[`q${i+1}`] === questions[i]["options"][correct[i]])
                mark++;    //Increases mark
        }

        let content = `
            <div style = "  padding: 1rem
                            border-radius: 2rem;
                            background-colour: lightgray">

                <h2> Grade: </h2>
                <p>${mark}/${totQs}</p>
            <div>`;
    
        res.send(content);
    }
);

quiz.listen(80);   //Currently listening on port 80