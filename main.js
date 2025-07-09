const screen = document.getElementById('screen');
const message = document.getElementById('message');
const result = document.getElementById('result');
const ratingSection = document.getElementById('rating-section');
const ratingText = document.getElementById('rating-text');
const ratingImg = document.getElementById('rating-img');
const resetButton = document.getElementById('reset-button');

let state = 'waiting';
let startTime;
let timeoutId;
let reactionTimes = [];

function handleAction(event) {
  if (event.type === 'keydown' && event.code !== 'Space') return;

  if (!resetButton.classList.contains('hidden')) return;

  if (state === 'waiting') {
    screen.classList.remove('ready', 'now', 'tooSoon');
    screen.classList.add('ready');

    message.textContent = '초록색이 되면 클릭하세요!';
    result.textContent = '';
    ratingSection.classList.add('hidden');
    state = 'ready';

    const delay = Math.floor(Math.random() * 3000) + 1000;

    timeoutId = setTimeout(() => {
      screen.classList.remove('ready', 'now', 'tooSoon');
      screen.classList.add('now');

      message.textContent = '지금!';
      startTime = new Date();
      state = 'now';
    }, delay);
  } else if (state === 'ready') {
    clearTimeout(timeoutId);
    screen.classList.remove('ready', 'now', 'tooSoon');
    screen.classList.add('tooSoon');

    message.textContent = '너무 빨라요!';
    result.textContent = '다시 시도하세요.';
    state = 'waiting';
  } else if (state === 'now') {
    const endTime = new Date();
    const reactionTime = endTime - startTime;
    reactionTimes.push(reactionTime);

    screen.classList.remove('ready', 'now', 'tooSoon');

    message.textContent = `반응속도: ${reactionTime}ms`;

    const average =
      reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;

    result.textContent = `평균: ${Math.round(average)}ms (${reactionTimes.length}회 측정됨)`;

    if (reactionTimes.length >= 5) {
      showRating(average);
    }

    state = 'waiting';
  }
}

function showRating(avg) {
  let text = '';
  let img = '';

  if (avg <= 100) {
    text = '탈인간급';
    img = 'alien.png';
  } else if (avg <= 150) {
    text = '인간계 최강';
    img = 'fighter.png';
  } else if (avg <= 200) {
    text = '동물적 반사신경';
    img = 'cat.png';
  } else if (avg <= 250) {
    text = '빠른 반응속도';
    img = 'dog.png';
  } else if (avg <= 300) {
    text = '평균 수준';
    img = 'person.png';
  } else if (avg <= 400) {
    text = '갱년기 시작';
    img = 'older.png';
  } else if (avg <= 500) {
    text = '실수하셨나요?';
    img = 'turtle.png';
  } else {
    text = '엄...대단하네요! (다른 의미로)';
    img = 'namu.png';
  }

  ratingText.textContent = text;
  ratingImg.src = img;
  ratingImg.alt = text;
  ratingSection.classList.remove('hidden');
  resetButton.classList.remove('hidden');
}

function resetTest() {
  reactionTimes = [];
  state = 'waiting';
  screen.classList.remove('ready', 'now', 'tooSoon');
  message.textContent = '클릭해서 시작하세요!';
  result.textContent = '';
  ratingSection.classList.add('hidden');
  resetButton.classList.add('hidden');
}

// 이벤트 리스너
screen.addEventListener('click', handleAction);
document.addEventListener('keydown', handleAction);
resetButton.addEventListener('click', resetTest);
