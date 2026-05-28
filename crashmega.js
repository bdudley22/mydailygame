const crashStartButtonMega = document.querySelector("#crashStartMega");
const crashCashoutButtonMega = document.querySelector("#crashCashoutMega");

const crashMultiplierTextMega = document.querySelector("#crashMultiplierMega");
const crashRocketMega = document.querySelector("#crashRocketMega");
const crashResultMega = document.querySelector("#crashResultMega");

let crashRunningMega = false;
let cashedOutMega = false;

let currentMultiplierMega = 1.00;
let crashPointMega = 1.00;

let crashBetMega = 1000; 

crashStartButtonMega.addEventListener("click", startCrashMega);
crashCashoutButtonMega.addEventListener("click", cashOutCrashMega);

function generateCrashPointMega() {
    let random = Math.random();

    if (random < 0.50) return (Math.random() * 1.5 + 1).toFixed(2);
    if (random < 0.80) return (Math.random() * 3 + 2).toFixed(2);
    if (random < 0.95) return (Math.random() * 10 + 5).toFixed(2);

    return (Math.random() * 80 + 20).toFixed(2);
}

function startCrashMega(e) {
    e.preventDefault();

    if (crashRunningMega) return;

    if (goldcount < crashBetMega) {
        crashResultMega.textContent = "NOT ENOUGH GOLD";
        new Audio("sounds/oof.mp3").play();
        return;
    }

    goldcount -= crashBetMega;
    goldcountText.textContent = "GOLD:" + Math.floor(goldcount);

    crashRunningMega = true;
    cashedOutMega = false;

    currentMultiplierMega = 1.00;
    crashPointMega = parseFloat(generateCrashPointMega());

    crashMultiplierTextMega.textContent = "1.00x";
    crashResultMega.textContent = "";
    crashRocketMega.textContent = "🚀";

    const interval = setInterval(() => {

        currentMultiplierMega += 0.035;

        crashMultiplierTextMega.textContent =
            currentMultiplierMega.toFixed(2) + "x";

        crashRocketMega.style.transform =
            `translateX(${currentMultiplierMega * 14}px)`;

        if (currentMultiplierMega >= crashPointMega) {

            clearInterval(interval);

            crashRocketMega.textContent = "💥";

            if (!cashedOutMega) {
                crashResultMega.textContent =
                    "CRASHED AT " + crashPointMega + "x";

                new Audio("sounds/oof.mp3").play();
            }

            crashRunningMega = false;
        }

    }, 50);
}

function cashOutCrashMega(e) {
    e.preventDefault();

    if (!crashRunningMega) return;
    if (cashedOutMega) return;

    cashedOutMega = true;

    let winnings = Math.floor(crashBetMega * currentMultiplierMega);
    goldcount += winnings;

    goldcountText.textContent =
        "GOLD:" + Math.floor(goldcount);

    crashResultMega.textContent =
        "CASHED OUT AT " +
        currentMultiplierMega.toFixed(2) +
        "x";

    new Audio("sounds/correct.mp3").play();

    if (currentMultiplierMega >= 15) {
        triggerWinEffect();
    }
}