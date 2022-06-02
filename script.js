const question = document.querySelector(".questions");

let questions = [];

// load JSON with FetchAPI
fetch('https://pub-quiz-game.herokuapp.com/history').then(obj => {
    return obj.json();
})
    .then(dataQuestion => {
        questions = dataQuestion.map(dataQuestion => {

            // all questions downloaded from a remote source with JSON format and put on the array by method map()

            console.log(dataQuestion);
            const
                convertedQuestion = {

                    // using the object structure to obtain data from the array

                    question: dataQuestion.question,
                    level: dataQuestion.difficulty,
                    type: dataQuestion.type
                };

            const answerChoices = [...dataQuestion.incorrect_answers];

            convertedQuestion.correctAnswer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                convertedQuestion.correctAnswer - 1, 0, dataQuestion.correct_answer);

            answerChoices.forEach((answer, index) => {

                convertedQuestion["answer" + (index + 1)] = answer;
                console.log(convertedQuestion);
            });
            return
            convertedQuestion;

        });

    })
    .catch(err => {
        console.log("error");

    });
