const slotButton = document.querySelector("#slotButton");
const slot1 = document.querySelector("#slot1");
const slot2 = document.querySelector("#slot2");
const slot3 = document.querySelector("#slot3");

const slotResult = document.querySelector("#slotResult");

const symbols = [
    "🍒",
    "🍋",
    "🍇",
    "💎",
    "7️⃣",
    "🍉",
    "⭐"
];
let slotSpinning = false;
slotButton.addEventListener("click", spinSlots);

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function triggerSlotWin() {
    new Audio("sounds/wow.mp3").play();

    document.body.style.transition = "background-color 0.2s ease";
    document.body.style.backgroundColor = "#39ff14";

    setTimeout(() => {
        document.body.style.backgroundColor = "#000000";
    }, 2000);
}

function spinSlots(e) {

    e.preventDefault();

    if (slotSpinning) return;

    slotSpinning = true;

    new Audio("sounds/click.mp3").play();

    let counter = 0;

    const spinInterval = setInterval(() => {

        slot1.textContent = getRandomSymbol();
        slot2.textContent = getRandomSymbol();
        slot3.textContent = getRandomSymbol();

        counter++;

        if (counter >= 25) {

            clearInterval(spinInterval);

            const final1 = getRandomSymbol();
            const final2 = getRandomSymbol();
            const final3 = getRandomSymbol();

            slot1.textContent = final1;
            slot2.textContent = final2;
            slot3.textContent = final3;

            if (final1 === final2 && final2 === final3) {

                slotResult.textContent = "JACKPOT!";
                triggerSlotWin();

            } else if (
                final1 === final2 ||
                final2 === final3 ||
                final1 === final3
            ) {

                slotResult.textContent = "SMALL WIN";
                new Audio("sounds/correct.mp3").play();
            } else {

                slotResult.textContent = "YOU LOST";
                new Audio("sounds/oof.mp3").play();
            }

            slotSpinning = false;
        }

    }, 100);
}