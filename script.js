// City schedule data
const citySchedule = [
    { name: "दिसावर", gap: 0 },
    { name: "आजमगढ़", gap: 1 },
    { name: "गोरखपुर", gap: 50 },
    { name: "सदर बाजार", gap: 65 },
    { name: "ग्वालियर", gap: 60 },
    { name: "दिल्ली बाजार", gap: 40 },
    { name: "श्री गणेश", gap: 85 },
    { name: "फरीदाबाद", gap: 85 },
    { name: "कानपुर सिटी", gap: 75 },
    { name: "रायपुर", gap: 0 },
    { name: "गाज़ियाबाद", gap: 80 },
    { name: "अयोध्या", gap: 80 },
    { name: "गली", gap: 100 }
];

let currentIndex = 0;
let timer = citySchedule[currentIndex].gap * 60; // Convert minutes to seconds

function getStorageKey(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getYesterdayNumber(cityName) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const key = `${getStorageKey(yesterday)}-${cityName}`;
    return localStorage.getItem(key) || "N/A";
}

function setTodayNumber(cityName, number) {
    const today = new Date();
    const key = `${getStorageKey(today)}-${cityName}`;
    localStorage.setItem(key, number);
}

function getAllRecords() {
    const recordTable = document.getElementById('recordBody');
    recordTable.innerHTML = ""; // Clear the table

    citySchedule.forEach(city => {
        const today = new Date();
        const todayKey = `${getStorageKey(today)}-${city.name}`;
        const yesterdayNumber = getYesterdayNumber(city.name);
        const todayNumber = localStorage.getItem(todayKey) || "";

        addRecord(city.name, city.gap, yesterdayNumber, todayNumber);
    });
}

function updateBettingInfo() {
    const currentCity = document.getElementById('cityName');
    const currentNumber = document.getElementById('number');
    const nextCity = document.getElementById('nextCityName');
    const yesterdayNumber = document.getElementById('yesterdayNumberValue');

    const cityName = citySchedule[currentIndex].name;
    currentCity.textContent = cityName;
    const newNumber = Math.floor(Math.random() * 100); // Random number between 0-99
    currentNumber.textContent = newNumber;
    setTodayNumber(cityName, newNumber);

    let nextIndex = (currentIndex + 1) % citySchedule.length;
    nextCity.textContent = citySchedule[nextIndex].name;

    yesterdayNumber.textContent = getYesterdayNumber(cityName);

    currentIndex = nextIndex;
    timer = citySchedule[currentIndex].gap * 60; // Convert minutes to seconds

    getAllRecords();
}

function addRecord(cityName, gap, yesterdayNumber, todayNumber) {
    const recordTable = document.getElementById('recordBody');
    const newRow = document.createElement('tr');

    const cityCell = document.createElement('td');
    const gapCell = document.createElement('td');
    const yesterdayCell = document.createElement('td');
    const todayCell = document.createElement('td');

    cityCell.className = "border border-transparent-500 p-2 bg-transparent-500 text-white";
    gapCell.className = "border border-transparent-500 p-2 bg-zinc-100 text-black";
    yesterdayCell.className = "border border-transparent-500 p-2 bg-zinc-100 text-black";
    todayCell.className = "border border-transparent-500 p-2 bg-zinc-100 text-black";

    cityCell.innerHTML = `<div>${cityName}</div><div class="text-transparent-500">${gap} Minutes</div><div>Record Chart</div>`;
    gapCell.textContent = `${gap} minutes`;
    yesterdayCell.textContent = yesterdayNumber;
    todayCell.textContent = todayNumber;

    newRow.appendChild(cityCell);
    newRow.appendChild(gapCell);
    newRow.appendChild(yesterdayCell);
    newRow.appendChild(todayCell);

    recordTable.appendChild(newRow);
}

function updateTimer() {
    const timerDisplay = document.getElementById('timeLeft');
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${minutes}m ${seconds}s`;

    if (timer > 0) {
        timer--;
    } else {
        updateBettingInfo();
    }
}

setInterval(updateTimer, 1000);

window.onload = () => {
    updateBettingInfo();
};
