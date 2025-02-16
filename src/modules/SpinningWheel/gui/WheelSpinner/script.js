// default names
const names = [
  "nate1280",
  "Lyfesaver74",
  "Njna_Grimsdottir",
  "Whipstickgostop",
  "Krayn_",
  "VRFlad",
  "Geocym",
  "FeVR",
  "nate1280",
  "Lyfesaver74",
  "Njna_Grimsdottir",
  "Whipstickgostop",
  "Krayn_",
  "VRFlad",
  "Lyfesaver74",
  "Njna_Grimsdottir",
  "Whipstickgostop",
  "Krayn_",
  "VRFlad",
  "Whipstickgostop",
  "Krayn_",
  "VRFlad",
  "Lyfesaver74",
  "Njna_Grimsdottir",
  "Whipstickgostop",
  "Krayn_",
  "VRFlad"
];

// Load names from names.txt
fetch("names.txt")
  .then((res) => {
    if (res.status === 200) return res.text();
    throw Error("Error fetching names.txt");
  })
  .then((text) => {
    const newNames = [];
    const namesFromFile = text.split("\n");
    console.log(namesFromFile);
    namesFromFile.forEach((name, idx) => {
      if (name) newNames.push(name);
    });
    if (newNames.length) names.splice(0, names.length, ...newNames);
    setupWheel();
  })
  .catch((e) => console.error(e));

// middle image
const params = new URLSearchParams(window.location.search);
let picture = params.get("img") || "https://streamer.bot/logo-300x300.png";
document.getElementById("image").src = picture;

// set your shit here
const WEBSOCKET_URI = "ws://127.0.0.1:8080/";
const ACTION_ID = "6c00f131-30f5-4991-8e1a-eafdb5f497c8";

/**
 * Prize data will space out evenly on the deal wheel based on the amount of items available.
 * @param text [string] name of the prize
 * @param color [string] background color of the prize
 * @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
 */
const colors = [
  "hsl(197 30% 43%)",
  "hsl(173 58% 39%)",
  "hsl(43 74% 66%)",
  "hsl(27 87% 67%)",
  "hsl(12 76% 61%)",
  "hsl(350 60% 52%)",
  "hsl(91 43% 54%)",
  "hsl(140 36% 74%)"
];
const reactions = ["resting", "dancing", "laughing", "shocked"];
const prizes = () =>
  names.map((name, idx) => {
    let colorIdx = idx >= colors.length ? idx % colors.length : idx;
    return {
      text: name,
      color: colors[colorIdx],
      reaction: reactions[Math.floor(Math.random() * reactions.length)]
    };
  });

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const reaper = wheel.querySelector(".grim-reaper");
const prizeSlice = () => 360 / prizes().length;
const prizeOffset = () => Math.floor(180 / prizes().length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
  prizes().forEach(({ text, color, reaction }, i) => {
    const rotation = prizeSlice() * i * -1 - prizeOffset();

    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes()
        .map(
          ({ text }, i) =>
            `${i === 0 ? "#a68200" : "#1c1c1c"} 0 ${prizeSlice()}deg`
        )
        }
    );`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += 2 * Math.PI;

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice());

  if (currentSlice !== slice) {
    ticker.style.animation = "none";
    setTimeout(() => (ticker.style.animation = null), 10);
    currentSlice = slice;
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice());
  prizeNodes[selected].classList.add(selectedClass);
  reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;

  // send answer to streamer.bot
  const resultText = prizeNodes[selected].textContent.trim();
  const ws = new WebSocket(WEBSOCKET_URI);
  ws.addEventListener("open", function (event) {
    ws.send(
      JSON.stringify({
        request: "DoAction",
        id: "DoAction",
        action: {
          id: ACTION_ID
        },
        args: {
          winner: resultText
        }
      })
    );
  });
};

function triggerSpin() {
  setupWheel();

  if (reaper.dataset.reaction !== "resting") {
    reaper.dataset.reaction = "resting";
  }

  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "none";
  runTickerAnimation();
}

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
});

setTimeout(triggerSpin, 250);
