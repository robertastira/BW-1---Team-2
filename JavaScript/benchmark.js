//dichiarazione variabili globali:
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

//funzione per caricare le domande dal file json fornito
// async function looadQuestions() {
//   const response = await fetch("http://bit.ly/strive_QUIZZ ");
//   const data = await response.json();
//   questions = data.questions;
//   displayQuestion();
// }

//funzione per visualizzare la domanda corrente

const displayQuestion = function () {
  const divQuestions = document.getElementById("txtquestion");
  const buttonAnswerDiv = document.getElementById("txtnumberedquestion");
  if (questionNumber < questions.length) {
    const currentQuestion = questions[questionNumber];
    divQuestions.innerHTML = `<div>${currentQuestion.question}</div>`;
    //funzione per visualizzare risposte boolean
    const displayBooleanAnswers = function (question) {
      const currentQuestion = questions[questionNumber];
      return `
      <button type="button" onclick='checkAnswer()'>${currentQuestion.incorrect_answers}</button>
      <button type="button" onclick='checkAnswer()'>${currentQuestion.correct_answer}</button>
      `;
    };
    //funzione per visualizzare risposte multiple
    const displayMultipleChoice = function (question) {
      const currentQuestion = questions[questionNumber];
      return `
      <button type="button" onclick='checkAnswer()'>${currentQuestion.correct_answer}</button>
      <button type="button" onclick='checkAnswer()'>${currentQuestion.incorrect_answers[0]}</button>
      <button type="button" onclick='checkAnswer()'>${currentQuestion.incorrect_answers[1]}</button>
      <button type="button" onclick='checkAnswer()'>${currentQuestion.incorrect_answers[2]}</button>
      `;
    };
    if (currentQuestion.type === "boolean") {
      buttonAnswerDiv.innerHTML = `${displayBooleanAnswers(currentQuestion)}`;
    } else {
      buttonAnswerDiv.innerHTML = `${displayMultipleChoice(currentQuestion)}`;
    }

    //far partire un timer:
    let totalTime = 0;
    questions.forEach((question) => {
      switch (question.difficulty) {
        case "easy":
          totalTime += 30; //tempo in secondi per domande facili
          break;
        case "medium":
          totalTime += 60; //tempo in secondi per domande medie
          break;
        case "120":
          totalTime += 120;
      }
    });

    displayTimer(totalTime);

    const displayTimer = function (totalTime) {
      let timerElement = document.getElementById("timer");
      let secondi = totalTime;
      timerElement.textContent = `${secondi}`;
      countdown(totalTime, timerElement);
    };

    //avvia il countdown del timer
    const countdown = function ()

    // //verifica la risposta

    const checkAnswer = function (userAnswer) {
      const currentQuestion = questions[questionNumber];
      if (userAnswer === currentQuestion.correct_answer) {
        score++;
      }
    };
    //     alert("Risposta corretta! +1 punto");
    //   } else {
    //     alert("Risposta errata!");
    //   }
    // };
    checkAnswer();

    //passa alla prossima domanda
    questionNumber++;
    displayQuestion();
  } else {
    //mostra punteggio finale
    alert("quiz completato, il tuo punteggio è " + score);
  }
};

displayQuestion();

// //GRAFICO
// const graficoCiambella = function (sbagliate, giuste) {
//   const ctx = document.getElementById("graficoCiambella").getContext("2d");

//   // Dati del grafico
//   const dati = {
//     datasets: [
//       {
//         data: [sbagliate, giuste], // Valori percentuali per i segmenti del grafico
//         backgroundColor: ["#D20094", "#00FFFF"], // Colori dei segmenti
//         borderColor: "white", // Colore del bordo
//         borderWidth: 2, // Spessore del bordo
//       },
//     ],
//     labels: ["SBAGLIATE", "GIUSTE"],
//   };

//   // Configurazione del grafico
//   const options = {
//     cutoutPercentage: 30,
//     responsive: false,
//     plugins: {
//       datalabels: {
//         color: "white",
//         font: {
//           weight: "bold",
//         },
//         // Box shadow per etichette di dati
//         shadowColor: "rgba(0, 0, 0, 0.3)",
//         shadowBlur: 10,
//         shadowOffsetX: 0,
//         shadowOffsetY: 4,
//       },
//     },
//   };

//   // Crea il grafico a ciambella
//   const donutChart = new Chart(ctx, {
//     type: "doughnut",
//     data: dati,
//     options: options,
//   });
// };
// graficoCiambella(13, 6);
//assegnazione della funzione checkAnswer al click dei bottoni
// document
//   .getElementsByTagName("button")
//   .addEventListener("click", function (event) {
//     if (event.target.tagName === "BUTTON") {
//       const selectedAnswer = event.target.textContent;
//       checkAnswer(selectedAnswer);
//     }
//   });
//funzione per verificare le risposte di tipo boolean
// const checkBooleanAnswer = function (question, userAnswer) {
//   if (userAnswer.toLowerCase() === question.correct_answer.toLowerCase()) {
//     alert("Risposta corretta! +1 punto");
//     score++;
//   } else {
//     alert("Risposta errata!");
//   }
// };

//funzione per verificare le risposte di tipo multiple
// const checkMultipleChoiseAnswer = function (question, userAnswer) {
//   if (
//     question.incorrect_answers.includes(userAnswer) ||
//     userAnswer.toLowerCase() !== question.correct_answer.toLowerCase()
//   ) {
//     alert("Risposta errata!");
//   } else {
//     alert("Risposta corretta! +1 punto");
//     score++;
//   }
// };
