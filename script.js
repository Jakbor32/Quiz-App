const questionHandle = document.querySelector(".question");
const questionLevel = document.querySelector(".question-level");
//const questionType = document.querySelector(".question-type");
const answers = Array.from(document.getElementsByClassName("answer"));
const numberOfQuestionsText = document.querySelector("#questionCounter");
const scoreText = document.querySelector("#points");
console.log(answers);
let questions = [];
let unselectedQuestions = [];
let numberOfQuestions, points, questionCounter;
let currentQuestion = {};
let goodAnswer = false;
const addOnePoint = 1;
// load JSON with FetchAPI
fetch('https://pub-quiz-game.herokuapp.com/history').then(obj => {
    return obj.json();
})
    .then(dataQuestion => {
        questions = dataQuestion.map(dataQuestion => {

            // all questions downloaded from a remote source with JSON format and put on the array by method map()

            console.log(dataQuestion);
            const convertedQuestion = {

                // using the object structure to obtain data from the array

                question: dataQuestion.question,
                level: dataQuestion.difficulty,
                type: dataQuestion.type
            };

            const answerChoices = [...dataQuestion.incorrect_answers];

            convertedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                convertedQuestion.answer - 1, 0, dataQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {

                convertedQuestion["answer" + (index + 1)] = choice;
                console.log(convertedQuestion);
            });
            return convertedQuestion;

        });
        startApp();
    })
    .catch(err => {
        console.log("error");

    });

startApp = () => {
    numberOfQuestions = 0;
    points = 0;
    unselectedQuestions = [...questions]
    nextQuestion();

}

nextQuestion = () => {
    if (unselectedQuestions.length === 0 || numberOfQuestions >= 59) {
        alert("Your Score: " + points + "/" + 59);
        //play again 
    }
    numberOfQuestions++;
    numberOfQuestionsText.innerText = numberOfQuestions + "/" + 59;

    const questionNumber = Math.floor(Math.random() * unselectedQuestions.length);

    currentQuestion = unselectedQuestions[questionNumber];


    questionHandle.innerText = currentQuestion.question;
    questionLevel.innerText = "Level: " + currentQuestion.level;
    //questionType.innerText = "Type: " + currentQuestion.type;

    if (currentQuestion.type == "boolean") {
        answers[2].classList.add("close");
        answers[3].classList.add("close");
        answers.forEach(answer => {
            const number = answer.dataset['number'];
            answer.innerText = currentQuestion['answer' + number];


        });
    } else {
        answers[2].classList.remove("close");
        answers[3].classList.remove("close");
        answers.forEach(answer => {
            const number = answer.dataset['number'];
            answer.innerText = currentQuestion['answer' + number];


        });
    }
    unselectedQuestions.splice(questionNumber, 1);
    goodAnswer = true;

};
answers.forEach(answer => {
    answer.addEventListener("click", event => {
        console.log(event.target);
        if (!goodAnswer) return;

        goodAnswer = false;
        const markedChoice = event.target;
        const markedAnswer = markedChoice.dataset["number"];
        console.log(markedAnswer == currentQuestion.answer) //TRUE JAKK POPRAWNA
        const classToApply = markedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(addOnePoint);
        }
        console.log(classToApply);
        console.log(markedAnswer);

        markedChoice.classList.add(classToApply);   //ustawic kalse correct i incorrect

        setTimeout(() => {
            markedChoice.classList.remove(classToApply);
            nextQuestion();

        }, 1000)
    });
});
incrementScore = num => {
    points += num;
    scoreText.innerText = points;
}