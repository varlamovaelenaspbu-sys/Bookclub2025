const pins = document.querySelectorAll('.pin');
const pathSVG = document.querySelector('.path-lines');

let lastPin = null;
const clickCounts = {};

pins.forEach(pin => {
  const pinId = pin.dataset.section;
  clickCounts[pinId] = 0;

  pin.addEventListener('click', () => {
    clickCounts[pinId]++;

    if (clickCounts[pinId] === 1) {
      if (lastPin && lastPin !== pin) {
        drawPath(lastPin, pin);
      }
      lastPin = pin;
    } else if (clickCounts[pinId] === 2) {
      openPopup(pinId);
      clickCounts[pinId] = 0;
    }
  });
});

const sectionContent = document.getElementById('section-content');

const sections = {
  shire: "Shire: Last year's stats!",
  rivendell: "Rivendell: Book Bingo Results!",
  moria: "Moria: DNF'd books & tough reads!",
  rohan: "Rohan: Top Picks & Wild Rides!",
  gondor: "Gondor: Final Awards & Looking Ahead!",
  mordor: "Mordor: 2026"
};


function drawPath(fromPin, toPin) {
  const svg = pathSVG;
  const from = fromPin.getBoundingClientRect();
  const to = toPin.getBoundingClientRect();
  const map = document.querySelector('.map').getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", from.left - map.left + from.width / 2);
  line.setAttribute("y1", from.top - map.top + from.height / 2);
  line.setAttribute("x2", from.left - map.left + from.width / 2);
  line.setAttribute("y2", from.top - map.top + from.height / 2);
  line.setAttribute("stroke", "#5c4529");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("stroke-dasharray", "5,5");
  svg.appendChild(line);

  
  let progress = 0;
  const x2 = to.left - map.left + to.width / 2;
  const y2 = to.top - map.top + to.height / 2;

  function animate() {
    if (progress < 1) {
      progress += 0.02;
      const currentX = from.left - map.left + from.width / 2 + (x2 - (from.left - map.left + from.width / 2)) * progress;
      const currentY = from.top - map.top + from.height / 2 + (y2 - (from.top - map.top + from.height / 2)) * progress;
      line.setAttribute("x2", currentX);
      line.setAttribute("y2", currentY);
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function openPopup(sectionId) {
  const overlay = document.getElementById('popup-overlay');
  const iframe = document.getElementById('popup-content');
  const closeBtn = document.getElementById('popup-close');

  iframe.src = `${sectionId}.html`;
  overlay.classList.remove('hidden');

  closeBtn.onclick = () => {
    overlay.classList.add('hidden');
    iframe.src = ''; 
  };
}

