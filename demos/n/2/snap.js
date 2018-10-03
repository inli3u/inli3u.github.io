
let timeout = null;
let article = document.querySelector('article');
let currentSection = null;
let snapping = false;

window.addEventListener('scroll', function() {
  clearTimeout(timeout);
  
  // moving into new section?
    // not far enough? return to top or bottom
    // far enough? snap to new section top or bottom

    // edge case: section is shorter than screen height. this is not allowed, would be pointless.

  let sections = document.querySelectorAll('section');
  let topSection = hitY(sections, window.scrollY);
  let bottomSection = hitY(sections, window.scrollY + window.innerHeight);

  if (!topSection || !bottomSection) return;

  if (topSection === bottomSection) {
    return;
  }

  // Show that we're transitioning between sections.
  if (!article.classList.contains('scrolling')) {
    article.classList.add('scrolling');
  }

  // Far enough into top to snap?
  topDelta = topSection.offsetTop + topSection.offsetHeight - window.scrollY;
  if (topDelta > 100) {
    backToNormal();
    scrollToBottom(topSection);
    return;
  }

  // Far enough into bottom to snap?
  bottomDelta = window.scrollY + window.innerHeight - bottomSection.offsetTop;
  if (bottomDelta > 100) {
    backToNormal();
    scrollToTop(bottomSection);
    return;
  }

  // Haven't snapped yet, prepare to snap back to previous section when user stops scrolling
  timeout = setTimeout(function() {
    // return to top or bottom
    //backToNormal();
    //returnToNearestSection()
  }, 100);
})

function scrollToTop(el) {
  snapping = true;
  window.scroll({
    top: el.offsetTop,
    behavior: 'smooth'
  });
}

function scrollToBottom(el) {
  snapping = true;
  window.scroll({
    top: el.offsetTop + el.offsetHeight,
    behavior: 'smooth'
  });
}

function hitY(elems, y) {
  for (el of elems) {
    if (y > el.offsetTop && y < el.offsetTop + el.offsetHeight) {
      return el;
    }
  }
}

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