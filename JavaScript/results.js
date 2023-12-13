// QUESTO SERVE PER INSERIRE IL VALORE DELLA PARCENTUALE DI RISPOSTE ESATTE
var value = 60;
var data = {
  labels: ["My val", ""],
  datasets: [
    {
      data: [value, 100 - value],
      backgroundColor: ["#00ffff", "#d20094"],
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
