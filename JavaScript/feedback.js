document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".stars");

    stars.forEach(function (star, index) {
      star.addEventListener("click", function () {
        event.preventDefault();
        resetStars();
        highlightStars(index + 1);
      });
    });

    function resetStars() {
      stars.forEach(function (star) {
        star.classList.remove("selected");
      });
    }

    function highlightStars(count) {
      for (let i = 0; i < count; i++) {
        stars[i].classList.add("selected");




      }
    }
  });