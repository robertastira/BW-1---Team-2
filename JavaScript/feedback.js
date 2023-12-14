document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".stars");
  
    // const highlightStars = document.getElementsByClassName('stars')
  
    //   seleziona tutti gli elementi con la classe css "stars"
    //  la funzione viene eseguita quando il documento viene caricato completamente
  
    stars.forEach(function (star, index) {
      star.addEventListener("click", function () {
        event.preventDefault();
        resetStars();
        console.log(`hai dato ${index + 1} su 10`);
        highlightStars(index + 1);
      });
    });
    // aggiunge un gestore di eventi click a ciascuna stella e previene la deselezione della pagina
    // ho messo un console log in modo da dargli un valore di voto
    function resetStars() {
      stars.forEach(function (star) {
        star.classList.remove("selected");
      });
    }
  
    // con questa funzione preveniamo il problema di avere piu caselle selezionate
  
    function highlightStars(count) {
      for (let i = 0; i < count; i++) {
        stars[i].classList.add("selected");
      }
      // aggiungo la classe eventi selected all'elemento
    }
  });