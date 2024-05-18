const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
let shuffledQuestions, currentQuestionIndex, score;
const questions = [
    {
        question: "Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds.What is the ratio of their speeds?",
        answers: [
            {text: "1:3", correct: false},
            {text: "3:2", correct: true},
            {text: "3:4", correct: false},
            {text: "None of these", correct: false},
        ],
    },
    {
        question: "A man complete a journey in 10 hours. He travels first half of the journey at the rate of 21 km/hr and second half at the rate of 24 km/hr. Find the total journey in km.",
        answers: [
            {text: "224 km", correct: true},
            {text: "220 km", correct: false},
            {text: "230 km", correct: false},
            {text: "234 km", correct: false},
        ],
    },
    {
        question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
        answers: [
            {text: "4", correct: false},
            {text: "3", correct: false},
            {text: "6", correct: false},
            {text: "5", correct: true},
        ],
    },
    {
        question: "(112 x 54) = ?",
        answers: [
            {text: "77200", correct: false},
            {text: "67000", correct: false},
            {text: "70000", correct: true},
            {text: "76500", correct: false},
        ],
    },
    {
        question: "Three times the first of three consecutive odd integers is 3 more than twice the third.What is the third integer?",
        answers: [
            {text: "13", correct: false},
            {text: "15", correct: true},
            {text: "9", correct: false},
            {text: "11", correct: false},
        ],
    },
    {
        question: "The sum of the digits of a two-digit number is 15 and the difference between the digits is 3. What is the two-digit number?",
        answers: [
            {text: "69", correct: false},
            {text: "78", correct: false},
            {text: "Cannot be determined", correct: true},
            {text: "96", correct: false},
        ],
    },
    {
        question: "The average weight of 8 person's increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What might be the weight of the new person?",
        answers: [
            {text: "76 kg", correct: false},
            {text: "85 kg", correct: true},
            {text: "76.5 kg", correct: false},
            {text: "Data inadequate", correct: false},
        ],
    },
    {
        question: "The price of 10 chairs is equal to that of 4 tables. The price of 15 chairs and 2 tables together is Rs. 4000. The total price of 12 chairs and 3 tables is:",
        answers: [
            {text: "3900", correct: true},
            {text: "3750", correct: false},
            {text: "3840", correct: false},
            {text: "3500", correct: false},
        ],
    },
    {
        question: "Two numbers are respectively 20% and 50% more than a third number. The ratio of the two numbers is:",
        answers: [
            {text: "6:7", correct: false},
            {text: "2:5", correct: false},
            {text: "3:5", correct: false},
            {text: "4:5", correct: true},
        ],
    },
    {
        question: "The H.C.F. of two numbers is 23 and the other two factors of their L.C.M. are 13 and 14. The larger of the two numbers is:",
        answers: [
            {text: "276", correct: false},
            {text: "299", correct: false},
            {text: "322", correct: true},
            {text: "345", correct: false},
        ],
    },
];
startQuiz();
function startQuiz() {
    score = 0;
    questionContainer.style.display = "flex";
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "answer" + index;
        radio.name = "answer";
        radio.value = index;
        const label = document.createElement("label");
        label.htmlFor = "answer" + index;
        label.innerText = answer.text;
        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
    });
}
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
nextButton.addEventListener("click", () => {
    const answerIndex = Array.from(
        answerButtons.querySelectorAll("input")
    ).findIndex((radio) => radio.checked);
    if (answerIndex !== -1) {
        if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (shuffledQuestions.length > currentQuestionIndex) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert("Please select an answer.");
    }
});
restartButton.addEventListener("click", startQuiz);
function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}