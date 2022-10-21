// data -- questions
function fetchQuestionList() {
    return window._questions;
}

function fetchQuestion(index) {
    return window._questions[index];
};

function shuffleQuestions(questions) {
    const shuffled = JSON.parse(JSON.stringify(questions)).map((question) => ({...question, _random: Math.random() }));
    shuffled.sort((a, b) => b._random - a._random);
    return shuffled;
}

// data -- state
function getState() {
    const raw = localStorage.getItem('state');
    let state;

    if (raw) {
        try {
            state = JSON.parse(raw);
        } catch {
            console.warn('getState() could not parse:', state);
        }
    }

    if (!state) {
        state = {
            deck: undefined,
            deckPos: 0
        };
    }
    return state;
}

function setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
    console.log('setState()', state);
}

function withState(cb) {
    const result = cb(getState());
    if (result) {
        setState(result);
    }
}

function getCurrentQuestion() {
    const state = getState();
    return state.deck[state.deckPos];
}


// common elems
const currentQuestionCat = document.querySelector('#current-question .category');
const currentQuestionPrompt = document.querySelector('#current-question .prompt');
const controlsPosition = document.querySelector('#controls .position');
const controlsNext = document.getElementById('btn-next');
const controlsPrev = document.getElementById('btn-prev');
const controlsShuffle = document.getElementById('btn-shuffle');
const controlsFilter = document.getElementById('filter-category');


// Commands

function doStartup() {
    const state = getState();

    if (!state.deck) {
        doShuffle();
    }

    setState(state);
}

function doMove(n) {
    withState((state) => {
        console.log(state);
        state.deckPos += n;
        return state;
    });
}

function doShuffle() {
    const state = getState();
    let questions = fetchQuestionList();
    if (state.category) {
        questions = questions.filter((q) => q.category == state.category);
    }
    state.deck = shuffleQuestions(questions);
    state.deckPos = 0;
    setState(state);
}

// handlers

function handleNext() {
    doMove(1);
    renderCurrentQuestion();
}

function handlePrev() {
    doMove(-1);
    renderCurrentQuestion();
}

function handleShuffle() {
    doShuffle();
    renderCurrentQuestion();
}

function handleFilter() {
    withState((state) => {
        state.category = controlsFilter.value;
        return state;
    });
    doShuffle();
    render();
}

function handleQuestionClick() {
    renderCurrentQuestion();
}

controlsNext.addEventListener('click', handleNext);
controlsPrev.addEventListener('click', handlePrev);
controlsShuffle.addEventListener('click', handleShuffle);
controlsFilter.addEventListener('change', handleFilter);


// view -- render all
function render() {
    renderCurrentQuestion();
    renderQuestionList();
    renderControls()
}

function renderControls() {
    if (controlsFilter.options.length) return;
    const cats = getCategories();

    for (c of cats) {
        const opt = document.createElement('option');
        opt.value = c;
        opt.text = c;
        controlsFilter.append(opt);
    }
}

// view -- display question
function renderCurrentQuestion() {
    const state = getState();
    const question = getCurrentQuestion();

    currentQuestionCat.textContent = question.category;
    currentQuestionPrompt.textContent = question.prompt;
    controlsPosition.textContent = `${state.deckPos + 1} of ${state.deck.length}`;
    controlsNext.disabled = state.deckPos >= state.deck.length -1;
    controlsPrev.disabled = state.deckPos <= 0;
}

function getCategories() {
    const questions = fetchQuestionList();
    const cats = new Set();
    for (q of questions) {
        cats.add(q.category);
    }
    return cats;
}

// view -- display question list
function renderQuestionList() {
    const state = getState();
    const root = document.querySelector('#toc');
    let questions = fetchQuestionList();
    if (state.category) {
        questions = questions.filter((q) => q.category == state.category);
    }
    root.replaceChildren([]);
    for (let i = 0; i < questions.length; i++) {
        const item = document.createElement('div');
        item.textContent = questions[i].prompt;
        root.append(item);
    }
}

doStartup();
render();


// getQuestionByDeckPos

// shuffle func

// get deck and pos from local storage

// if no deck, run shuffle

// next, prev move pointer in deck

// setCurrentQuestion