let button = document.querySelector("#gambleButton");
let rouletteNumber = document.querySelector("#rouletteNumber");
let dailyText = document.querySelector("#daily");
let isSpinning = false;
button.addEventListener("click", playGamble);
function triggerWinEffect() {
    const winSound = new Audio("sounds/wow.mp3");
    winSound.play();
    document.body.style.transition = "background-color 0.2s ease";
    document.body.style.backgroundColor = "#39ff14";
    setTimeout(() => {
        document.body.style.backgroundColor = "#000000";
    }, 3000);
}
/* ---------------- DAILY NUMBER ---------------- */
function getDailyNumber() {
    let today = new Date().toISOString().split("T")[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 1000;
}
dailyText.textContent = "daily number is: " + getDailyNumber();

/* ---------------- GAMBLE LOGIC ---------------- */
function playGamble(e){
    e.preventDefault();
    if (isSpinning) return;
    isSpinning = true;
    const sound = new Audio("sounds/csgo.mp3");
    sound.play();
    let finalNumber;
    let winChance = Math.floor(Math.random() * 100) + 1;
    let daily = getDailyNumber();
    if(winChance === 100){
        finalNumber = daily;
    } else {
        finalNumber = Math.floor(Math.random() * 999);
    }
    setTimeout(() => {
        let counter = 0;
        let delay = 40;
        function spin() {
            rouletteNumber.textContent =
                Math.floor(Math.random() * 999);
            counter++;
            delay += 2;
            if(counter < 60){
                setTimeout(spin, delay);
            } else {
                rouletteNumber.textContent = finalNumber;
                let daily = getDailyNumber();
                if (finalNumber === daily) {
                    triggerWinEffect();
                }
                isSpinning = false;
            }
        }
        spin();
    }, 1500);
}