
const crashStartButton = document.querySelector("#crashStart");
const crashCashoutButton = document.querySelector("#crashCashout");

const crashMultiplierText = document.querySelector("#crashMultiplier");
const crashRocket = document.querySelector("#crashRocket");
const crashResult = document.querySelector("#crashResult");

let crashRunning = false;
let cashedOut = false;

let currentMultiplier = 1.00;
let crashPoint = 1.00;
let crashBet = 100;

crashStartButton.addEventListener("click", startCrash);
crashCashoutButton.addEventListener("click", cashOutCrash);

function generateCrashPoint() {

    let random = Math.random();

    if (random < 0.50) return (Math.random() * 1.5 + 1).toFixed(2);
    if (random < 0.80) return (Math.random() * 3 + 2).toFixed(2);
    if (random < 0.95) return (Math.random() * 10 + 5).toFixed(2);

    return (Math.random() * 50 + 15).toFixed(2);
}

function startCrash(e) {
    e.preventDefault();

    e.preventDefault();

    if (crashRunning) return;

    if (goldcount < crashBet) {

        crashResult.textContent = "NOT ENOUGH GOLD";
        new Audio("sounds/oof.mp3").play();
        return;
    }

    goldcount -= crashBet;
    goldcountText.textContent = "GOLD:" + Math.floor(goldcount);

    new Audio("sounds/click.mp3").play();

    crashRunning = true;
    cashedOut = false;

    currentMultiplier = 1.00;
    crashPoint = parseFloat(generateCrashPoint());

    crashMultiplierText.textContent = "1.00x";
    crashResult.textContent = "";
    crashRocket.textContent = "🚀";

    const interval = setInterval(() => {

        currentMultiplier += 0.03;

        crashMultiplierText.textContent =
            currentMultiplier.toFixed(2) + "x";

        crashRocket.style.transform =
            `translateX(${currentMultiplier * 12}px)`;

        if (currentMultiplier >= crashPoint) {

            clearInterval(interval);

            crashRocket.textContent = "💥";

            if (!cashedOut) {

                crashResult.textContent =
                    "CRASHED AT " + crashPoint + "x";

                new Audio("sounds/oof.mp3").play();
            }

            crashRunning = false;
        }

    }, 50);
}

function cashOutCrash(e) {
    e.preventDefault();

    if (!crashRunning) return;
    if (cashedOut) return;

    cashedOut = true;

    let winnings = Math.floor(crashBet * currentMultiplier);
    goldcount += winnings;

    goldcountText.textContent =
        "GOLD:" + Math.floor(goldcount);

    crashResult.textContent =
        "CASHED OUT AT " +
        currentMultiplier.toFixed(2) +
        "x";

    new Audio("sounds/correct.mp3").play();

    if (currentMultiplier >= 15) {
        triggerWinEffect();
    }
}
