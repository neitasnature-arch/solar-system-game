const facts = {
  mercury: "Merkurs ir vistuvāk Saulei esošā planēta un mazākā Saules sistēmā.",
  venus: "Venēra ir ļoti karsta planēta biezās atmosfēras dēļ.",
  earth: "Zeme ir vienīgā zināmā planēta, uz kuras pastāv dzīvība.",
  moon: "Mēness ir Zemes dabiskais pavadonis un ietekmē paisumus.",
  mars: "Marss tiek saukts par Sarkano planētu.",
  jupiter: "Jupiters ir lielākā planēta Saules sistēmā.",
  saturn: "Saturns ir slavens ar saviem gredzeniem.",
  uranus: "Urāns griežas uz sāniem un ir ļoti auksts.",
  neptune: "Neptūnā pūš visspēcīgākie vēji.",
  pluto: "Plutons ir pundurplanēta tālu no Saules."
};

let dragged = null;

document.querySelectorAll('[draggable]').forEach(el => {
  el.addEventListener('dragstart', e => {
    dragged = el;
  });

  // Mobilajām ierīcēm
  el.addEventListener('touchstart', () => dragged = el);
});

document.querySelectorAll('.orbit').forEach(orbit => {

  orbit.addEventListener('dragover', e => e.preventDefault());

  orbit.addEventListener('drop', () => checkDrop(orbit));

  orbit.addEventListener('touchend', () => checkDrop(orbit));
});

function checkDrop(orbit) {
  if (!dragged) return;

  if (orbit.dataset.planet === dragged.dataset.planet) {
    orbit.appendChild(dragged);
    dragged.style.position = "absolute";
    dragged.style.top = "50%";
    dragged.style.left = "50%";
    dragged.style.transform = "translate(-50%, -50%)";
    dragged.draggable = false;

    orbit.classList.add("correct");

    document.getElementById("correctSound").play();
    showInfo(facts[dragged.dataset.planet]);
  }

  dragged = null;
}

function showInfo(text) {
  const info = document.getElementById("info");
  info.textContent = text;
  info.style.display = "block";

  setTimeout(() => {
    info.style.display = "none";
  }, 4000);
}
