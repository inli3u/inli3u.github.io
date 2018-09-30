
let timeout = null;
let article = document.querySelector('article');
let userInitiated = false;

window.addEventListener('scroll', function() {
  clearTimeout(timeout);
  
  article.classList.add('scrolling');

  timeout = setTimeout(function() {
    backToNormal();
    returnToNearestSection()
  }, 500);
})

function backToNormal() {
  article.classList.remove('scrolling');
}

function returnToNearestSection() {
  let sections = document.querySelectorAll('section');
  for (let el of sections) {
    console.log(window.scrollY, el.offsetTop);

    if (window.scrollY == el.offsetTop) {
      return;
    }

    let halfViewHeight = window.innerHeight / 2;
    if (window.scrollY > el.offsetTop - halfViewHeight && window.scrollY < el.offsetTop + el.offsetHeight - halfViewHeight) {
      window.scroll({
        top: el.offsetTop,
        behavior: 'smooth'
      });
      // backToNormal();
      return;
    }
  }
}