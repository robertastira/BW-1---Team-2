// QUESTO SERVE PER INSERIRE IL VALORE DELLA PARCENTUALE DI RISPOSTE ESATTE
let value = localStorage.getItem("quizPercentage") || 0;
let score = localStorage.getItem("score");
let data = {
  labels: ["My val", ""],
  datasets: [
    {
      data: [100 - value, value],
      backgroundColor: ["#d20094", "#00ffff"],
      //   hoverBackgroundColor: ["#FF6384", "#AAAAAA"],
      //   hoverBorderColor: ["#FF6384", "#ffffff"],
    },
  ],
};

var myChart = new Chart(document.getElementById("myChart"), {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 70,
    tooltips: {
      filter: function (item, data) {
        var label = data.labels[item.index];
        if (label) return item;
      },
    },
  },
});

textCenter(value);

function textCenter(val) {
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";

      //   var text = val + "%",
      //     textX = Math.round((width - ctx.measureText(text).width) / 2),
      //     textY = height / 2;

      var text = "",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  });
}

// PERCENTUALE CORRETTE
const correctQ = document.getElementById("percentagecorrect");
const correctAnswerPercent = value + "%";
correctQ.innerText = correctAnswerPercent;

// PERCENTUALE SBAGLIATE
const wrongQ = document.getElementById("percentagewrong");
const incorrectAnswerPercent = 100 - value + "%";
wrongQ.innerText = incorrectAnswerPercent;

// DOMANDE CORRETTE SU TOTALE 2/10
const questionsCorrect = document.getElementById("questionscorrect");
const correctAnswers = score + "/10 questions";
questionsCorrect.innerText = correctAnswers;

// DOMANDE SBAGLIATE SU TOTALE 8/10
const questionsWrong = document.getElementById("questionswrong");
const wrongAnswers = 10 - score + "/10 questions";
questionsWrong.innerText = wrongAnswers;

const displayResults = function () {
  const titleResults = document.getElementById("TitleInside");
  const subtitleResults = document.getElementById("micro");
  if (score > 5) {
    titleResults.innerHTML = `<h4>Congratulations!</h4>
    <h4 id="color-blue">You passed the exam.</h4>`;
    subtitleResults.innerHTML = `<p>We'll send you the certificate in few minutes.</p>
    <p>Check your email (including promotions / spam folder)</p>`;
  } else {
    titleResults.innerHTML = `<h4>We are sorry!</h4>
    <h4 id="color-blue">You've not passed the exam.</h4>`;
    subtitleResults.innerHTML = `<p>We'll send you some links for study in few minutes.</p>
    <p>Check your email (including promotions / spam folder)</p>`;
  }
};

displayResults();
