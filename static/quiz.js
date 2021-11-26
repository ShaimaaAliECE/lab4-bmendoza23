let xReq = new XMLHttpRequest();

xReq.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let questions = JSON.parse(this.responseText);  //Get questions from server
        //Executes when document is ready
        $(document).ready(function()
        {
            let content = `<form action ="/submit" method ="post">`;

            //Loop parses information for every question

            for (const [i,q] of questions.entries())
            {   //Adding question as bold text
                content += `
                <div    id      = "question${i+1}"
                        style   =  "margin: 0.5rem 0;
                                    padding: 0.5 rem;
                                    border: 2px solid black;
                                    border-radius: 1rem;
                                    background-color: lightgray">
                <p><b>${i+1}${q.stem}</b></p>
                `;

                //Loops over each question answer option
                for (const [num, opt] of q.options.entries())
                {
                    //Adding radio button + label for each answer option
                    content +=  `
                    <input  type    = "radio"
                            value   = "${opt}"
                            name    = "q${i+1}"
                            id      = "q${i+1}a${num+1}"
                            required>
                    <label  for     = "q${i+1}a${num+1}">${opt}</label>
                    <br>
                    `;
                }
                content += `
                    <div    id      = "feedback${i+1}"
                            style   = "margin-top: 1rem">
                    </div>
                <div>`;
            }
            
            //Submit Button
            content +=
                    `<button style   = "margin-top: 1rem">Submit</button>
                    </form>`;

            //Set content to quiz in the html
            $("#quiz").html(content);

            //Detecting change in radio buttons 
            $(`input[type="radio]`).change(function()
            {
                //Radio Button Checke 
                if ($(this).is(":checked"))
                {
                    let clicked = this;
                    let answerRequest = new XMLHttpRequest();  //New request for post
                    answerRequest.onreadystatechange = function()
                    {
                        if(this.ready == 4 && this.status == 200)
                        {
                            //Alerting user feedback
                            let fb = this.responseText;
                            $(`#feedback${clicked.id[1]}`).html(fb)
                        }
                    };

                    //Option to hold clicked radio button's id
                    let clickedObject =
                    {
                        id: clicked.id,
                    };

                    //Converting clickedObject to a JSON
                    let jsonClicked = JSON.stringify(clickedObject);

                    //POST request
                    answerRequest.open("POST", "/check", true);
                    answerRequest.setRequestHeader("Content-Type", "application/json");
                    //Sending JSON object in request
                    answerRequest.send(jsonClicked);
                }
            }); 
        });
    }
};

xReq.open("GET", "/questions", true);   //Asynchronously gets /questions
xReq.send();                            //Sends XMLHTTPRequest