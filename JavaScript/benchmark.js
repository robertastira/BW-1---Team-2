


let score = 0;
let questionNumber = 0;
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
const divQuestions = document.getElementById("txtquestion");
const buttonAnswerDiv = document.getElementById("txtnumberedquestion");
const displayBooleanAnswers = function (question) {
  return `
      <button onclick='checkAnswer("${question.incorrect_answers}")'>${question.incorrect_answers}</button>
      <button onclick='checkAnswer("${question.correct_answer}")'>${question.correct_answer}</button>
    `;
};

const displayMultipleChoice = function (question) {
  return `
      <button onclick='checkAnswer("${question.correct_answer}")'>${question.correct_answer}</button>
      <button onclick='checkAnswer("${question.incorrect_answers[0]}")'>${question.incorrect_answers[0]}</button>
      <button onclick='checkAnswer("${question.incorrect_answers[1]}")'>${question.incorrect_answers[1]}</button>
      <button onclick='checkAnswer("${question.incorrect_answers[2]}")'>${question.incorrect_answers[2]}</button>
    `;
};

var actualQuestion = 1;
var maxQuestion = questions.length;

const displayQuestion = function () {
  document.getElementById('questions').innerHTML = 'QUESTION ' + actualQuestion + ' / <span class="custom__purple__text">' + maxQuestion + '</span>';
  if (questionNumber < questions.length) {
    const currentQuestion = questions[questionNumber];
    divQuestions.innerHTML = `<div>${currentQuestion.question}</div>`;

    if (currentQuestion.type === "boolean") {
      buttonAnswerDiv.innerHTML = `${displayBooleanAnswers(currentQuestion)}`;
    } else {
      buttonAnswerDiv.innerHTML = `${displayMultipleChoice(currentQuestion)}`;
    }
  } else {
    // Il gioco è terminato, mostra il punteggio finale
    alert("Quiz completato, il tuo punteggio è " + score);
  }
};



const checkAnswer = function (userAnswer) {
  actualQuestion++;
 
  const currentQuestion = questions[questionNumber];
  if (userAnswer === currentQuestion.correct_answer) {
    score++;
    alert("Risposta corretta! +1 punto");
  } else alert("Risposta errata!");

  // Passa alla prossima domanda solo se non hai raggiunto la fine del gioco
  if (questionNumber < questions.length - 1) {
    questionNumber++;
    displayQuestion();
  } else {
    // Il gioco è terminato, mostra il punteggio finale
    alert("Quiz completato, il tuo punteggio è " + score);
  }
};

// Avvia il gioco mostrando la prima domanda
displayQuestion();
