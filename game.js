let button = document.querySelector("#gambleButton");
let rouletteNumber = document.querySelector("#rouletteNumber");
let dailyText = document.querySelector("#daily");
let goldcountText = document.querySelector("#gold");
let goldcount = 0;
const SPIN_COST = 250;
goldcountText.textContent = "GOLD:" + goldcount;
let isSpinning = false;
button.addEventListener("click", playGamble);
let underButton = document.querySelector("#underButton");
let overButton = document.querySelector("#overButton");

let underState = document.querySelector("#underState");
let overState = document.querySelector("#overState");


let under = false;
let over = false;
function setUnderOverLocked(locked) {
    underButton.disabled = locked;
    overButton.disabled = locked;

    underButton.style.opacity = locked ? "0.4" : "1";
    overButton.style.opacity = locked ? "0.4" : "1";
    underButton.style.pointerEvents = locked ? "none" : "auto";
    overButton.style.pointerEvents = locked ? "none" : "auto";
}
function playResultSound(isCorrect) {
    setTimeout(() => {
        if (isCorrect) {
            new Audio("sounds/correct.mp3").play();
        } else {
            new Audio("sounds/oof.mp3").play();
        }
    }, 500);
}
underButton.addEventListener("click", function(e){
    e.preventDefault();

    under = true;
    over = false;

    underState.textContent = "1";
    underState.classList.remove("off");
    underState.classList.add("on");

    overState.textContent = "0";
    overState.classList.remove("on");
    overState.classList.add("off");
});

overButton.addEventListener("click", function(e){
    e.preventDefault();

    over = true;
    under = false;

    overState.textContent = "1";
    overState.classList.remove("off");
    overState.classList.add("on");

    underState.textContent = "0";
    underState.classList.remove("on");
    underState.classList.add("off");
});
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
    return Math.abs(hash) % 451;
}
dailyText.textContent = "daily number is: " + getDailyNumber();

/* ---------------- GAMBLE LOGIC ---------------- */
function playGamble(e){
    e.preventDefault();
    if (isSpinning) return;
    isSpinning = true;
    setUnderOverLocked(true);
    const sound = new Audio("sounds/csgo.mp3");
    sound.play();
    let finalNumber;
    let winChance = Math.floor(Math.random() * 100) + 1;
    let daily = getDailyNumber();
    if(winChance === 100){
        finalNumber = daily;
    } else {
        finalNumber = Math.floor(Math.random() * 1001);
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
                /* ---------------- BASE GOLD GAIN ---------------- */
                goldcount += finalNumber;

                /* ---------------- DAILY JACKPOT ---------------- */
                if (finalNumber === daily) {
                    triggerWinEffect();
                    goldcount += daily;
                    goldcount *= 10;
                    goldcountText.textContent = "GOLD:" + goldcount;
                }

                /* ---------------- UNDER / OVER LOGIC ---------------- */
                if (under || over) {

                let isCorrect = false;

                /* OVER = higher odds */
                if (over) {

                    isCorrect = finalNumber > daily;

                    if (isCorrect) {
                        goldcount *= 1.1;
                    } else {
                        goldcount *= 0.8;
                    }
                }

                /* UNDER = lower odds */
                if (under) {

                    isCorrect = finalNumber < daily;

                    if (isCorrect) {
                        goldcount *= 1.5;
                    } else {
                        goldcount *= 0.85;
                    }
                }

                playResultSound(isCorrect);
            }
                goldcount = Math.floor(goldcount);
                goldcountText.textContent = "GOLD:" + goldcount;
                isSpinning = false;
                setUnderOverLocked(false);
            }
        }
        spin();
    }, 1500);
}

//WHEEL CODE BELOW!!!!!!!!!!!! ILOVE GAMBLING!!!!!!!!!!!!

var options = ["-$100", "$10", "$25", "$250", "-$3000", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "$0", "$50000", "$0", "$350", "-$500", "$99"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
let isSpinningTwo = false;
var ctx;

document.getElementById("spin").addEventListener("click", function(e){
    e.preventDefault();

    if (isSpinningTwo) return;

    if (goldcount < SPIN_COST) {
        new Audio("sounds/oof.mp3").play();
        return;
    }

    isSpinningTwo = true;

    spin();
});

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;
  
  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;
  
  return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {

  goldcount -= SPIN_COST;
  goldcountText.textContent = "GOLD:" + goldcount;

  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);

  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);

  var text = options[index];

  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
  /* ---------------- GOLD UPDATE ---------------- */
  let cleaned = text.replace("$", "").replace(" ", "");
  let value = parseInt(cleaned);
  if (!isNaN(value)) {
    goldcount += value; // supports negative automatically
    goldcountText.textContent = "GOLD:" + goldcount;
  }

  /* ---------------- WHEEL GAME LOGIC ---------------- */
  if (text === "$50000") {
      triggerWinEffect();
  }
  let numericValue = parseInt(text.replace(/[^0-9]/g, ""));

    if (isNaN(numericValue)) return;

    if (numericValue < 250) {
        new Audio("sounds/oof.mp3").play();
    } else {
        new Audio("sounds/correct.mp3").play();
    }
  isSpinningTwo = false;
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();