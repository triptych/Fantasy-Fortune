// Variables
const fortuneButton = document.getElementById('fortune-button');
const countdownTimer = document.getElementById('countdown-timer');
const fortuneMessage = document.getElementById('fortune-message');
const fortuneList = document.getElementById('fortune-list');

let fortunes = [];
let receivedFortunes = [];
let lastFortuneTime = localStorage.getItem('lastFortuneTime');

// Functions
async function fetchFortunes() {
  const response = await fetch('fortunes.json');
  fortunes = await response.json();
}

function getRandomFortune() {
  const availableFortunes = fortunes.filter(fortune => !receivedFortunes.includes(fortune.id));
  if (availableFortunes.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * availableFortunes.length);
  return availableFortunes[randomIndex];
}

function displayFortune() {
  const fortune = getRandomFortune();
  if (fortune) {
    fortuneMessage.textContent = fortune.message;
    receivedFortunes.push(fortune.id);
    localStorage.setItem('receivedFortunes', JSON.stringify(receivedFortunes));
    displayReceivedFortunes();
    startCountdownTimer();
  } else {
    fortuneMessage.textContent = 'You have received all available fortunes!';
  }
}

function displayReceivedFortunes() {
  fortuneList.innerHTML = '';
  receivedFortunes.forEach(fortuneId => {
    const fortune = fortunes.find(fortune => fortune.id === fortuneId);
    const listItem = document.createElement('li');
    listItem.textContent = fortune.message;
    fortuneList.appendChild(listItem);
  });
}

function startCountdownTimer() {
  const currentTime = new Date().getTime();
  const remainingTime = lastFortuneTime ? 24 * 60 * 60 * 1000 - (currentTime - lastFortuneTime) : 0;

  if (remainingTime <= 0) {
    countdownTimer.textContent = '';
    fortuneButton.disabled = false;
    localStorage.removeItem('lastFortuneTime');
  } else {
    fortuneButton.disabled = true;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    countdownTimer.textContent = `${hours}h ${minutes}m ${seconds}s`;
    setTimeout(startCountdownTimer, 1000);
  }
}

// Event Listeners
fortuneButton.addEventListener('click', () => {
  displayFortune();
  lastFortuneTime = new Date().getTime();
  localStorage.setItem('lastFortuneTime', lastFortuneTime);
});

// Initialization
fetchFortunes().then(() => {
  const storedFortunes = localStorage.getItem('receivedFortunes');
  if (storedFortunes) {
    receivedFortunes = JSON.parse(storedFortunes);
    displayReceivedFortunes();
  }
  startCountdownTimer();
});

// Hit Counter
const hitCountElement = document.getElementById('hit-count');

// Function to update the hit count
function updateHitCount() {
  let hitCount = localStorage.getItem('hitCount');
  
  if (hitCount === null) {
    hitCount = 0;
  }
  
  hitCount++;
  localStorage.setItem('hitCount', hitCount);
  hitCountElement.textContent = hitCount;
}

// Call the updateHitCount function when the page loads
updateHitCount();
