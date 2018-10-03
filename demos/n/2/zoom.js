(function() {

  let timeout = null;
  let article = document.querySelector('article');

  window.addEventListener('scroll', function() {
    clearTimeout(timeout);
    
    if (!article.classList.contains('scrolling')) {
      article.classList.add('scrolling');
    }

    timeout = setTimeout(function() {
      article.classList.remove('scrolling');
    }, 500);
  });

})();