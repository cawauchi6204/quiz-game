'use strict';

const question = document.getElementById('question');
const choices = document.getElementById('choices');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.querySelector('#result > p');

let isAnswered;
let score = 0;
let miss = 0;

const getRate = () => {
    return score / quizSet.length;
}

const quizSet = [
    { q: 'What is A', c: ['A0', 'A1', 'A2'] },
    { q: 'What is B', c: ['B0', 'B1', 'B2'] },
    { q: 'What is C', c: ['C0', 'C1', 'C2'] },
    { q: 'What is D', c: ['D0', 'D1', 'D2'] },
    { q: 'What is E', c: ['E0', 'E1', 'E2'] },
    { q: 'What is F', c: ['F0', 'F1', 'F2'] },
    { q: 'What is G', c: ['G0', 'G1', 'G2'] },
    { q: 'What is H', c: ['H0', 'H1', 'H2'] },
    { q: 'What is I', c: ['I0', 'I1', 'I2'] },
];

let currentNum = 0;
// このcurrentNumは問題文と答えの分にどちらにも適用させている

function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => {
            checkAnswer(li);
        })
        choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
        btn.textContent = 'show score';
    }
}

function checkAnswer(li) {
    if (isAnswered) {
        return;
    }
    isAnswered = true;
    if (li.textContent == quizSet[currentNum].c[0]) {
        li.classList.add('correct');
        score++;
    } else {
        li.classList.add('wrong');
        miss++;
    }
    btn.classList.remove('disabled');

}


function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

setQuiz();

btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
        return;
    }
    btn.classList.add('disabled');
    if (currentNum === quizSet.length - 1) {
        scoreLabel.textContent = `score:${score} miss:${miss} 正答率:${score/quizSet.length * 100}%`;
        result.classList.remove('hidden');
    } else {
        currentNum++;
        setQuiz();
    }
})