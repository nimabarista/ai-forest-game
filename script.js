const agents = [
  {
    name: "Luna",
    emoji: "🧑‍🚀",
    hunger: 75,
    thirst: 80,
    energy: 90,
    status: "Exploring the forest"
  },
  {
    name: "Atlas",
    emoji: "🤖",
    hunger: 60,
    thirst: 70,
    energy: 75,
    status: "Looking for food"
  },
  {
    name: "Nova",
    emoji: "🧝",
    hunger: 85,
    thirst: 65,
    energy: 80,
    status: "Building a shelter"
  }
];

let day = 1;
let time = 8;
let selectedAgent = null;

function updateAgent(agent) {
  agent.hunger = Math.max(0, agent.hunger - Math.floor(Math.random() * 8));
  agent.thirst = Math.max(0, agent.thirst - Math.floor(Math.random() * 10));
  agent.energy = Math.max(0, agent.energy - Math.floor(Math.random() * 6));

  if (agent.hunger < 25) {
    agent.status = "🍎 Looking for food";
  } else if (agent.thirst < 25) {
    agent.status = "💧 Looking for water";
  } else if (agent.energy < 25) {
    agent.status = "🏕️ Resting";
  } else {
    const actions = [
      "🌲 Exploring the forest",
      "🪵 Collecting wood",
      "🏕️ Building a shelter",
      "🔎 Searching for resources",
      "🔥 Staying near the fire"
    ];

    agent.status =
      actions[Math.floor(Math.random() * actions.length)];
  }
}

function createAgentCard(agent, index) {
  return `
    <div class="agent-card" onclick="selectAgent(${index})">
      <div class="agent-header">
        <span class="agent-emoji">${agent.emoji}</span>
        <div>
          <h3>${agent.name}</h3>
          <p>${agent.status}</p>
        </div>
      </div>

      <div class="stat">
        <span>🍎 Hunger</span>
        <div class="bar">
          <div class="fill hunger" style="width:${agent.hunger}%"></div>
        </div>
      </div>

      <div class="stat">
        <span>💧 Thirst</span>
        <div class="bar">
          <div class="fill thirst" style="width:${agent.thirst}%"></div>
        </div>
      </div>

      <div class="stat">
        <span>⚡ Energy</span>
        <div class="bar">
          <div class="fill energy" style="width:${agent.energy}%"></div>
        </div>
      </div>
    </div>
  `;
}

function renderAgents() {
  const container = document.getElementById("agents");

  if (!container) return;

  container.innerHTML = agents
    .map((agent, index) => createAgentCard(agent, index))
    .join("");
}

function updateWorld() {
  agents.forEach(updateAgent);

  time++;

  if (time >= 24) {
    time = 0;
    day++;
    addLog(`🌅 Day ${day} has started`);
  }

  const dayElement = document.getElementById("day");

  if (dayElement) {
    dayElement.textContent = `Day ${day}`;
  }

  const timeElement = document.getElementById("time");

  if (timeElement) {
    const hour = String(time).padStart(2, "0");
    timeElement.textContent = `${hour}:00`;
  }

  renderAgents();

  if (Math.random() > 0.7) {
    generateEvent();
  }
}

function generateEvent() {
  const events = [
    "🌧️ Rain has started in the forest",
    "🐺 Wolves were seen nearby",
    "🍎 Food was discovered",
    "💧 A water source was found",
    "🔥 The campfire is keeping everyone warm",
    "🌲 The agents discovered a new area"
  ];

  const event =
    events[Math.floor(Math.random() * events.length)];

  addLog(event);
}

function addLog(message) {
  const log = document.getElementById("log");

  if (!log) return;

  const item = document.createElement("div");

  item.className = "log-item";
  item.textContent = message;

  log.prepend(item);

  const items = log.querySelectorAll(".log-item");

  if (items.length > 6) {
    items[items.length - 1].remove();
  }
}

function selectAgent(index) {
  selectedAgent = agents[index];

  const panel = document.getElementById("agent-details");

  if (!panel) return;

  panel.innerHTML = `
    <h2>${selectedAgent.emoji} ${selectedAgent.name}</h2>
    <p>${selectedAgent.status}</p>

    <p>🍎 Hunger: ${selectedAgent.hunger}%</p>
    <p>💧 Thirst: ${selectedAgent.thirst}%</p>
    <p>⚡ Energy: ${selectedAgent.energy}%</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderAgents();

  addLog("🌲 Welcome to the AI Forest");
  addLog("🤖 AI agents are entering the forest");

  setInterval(updateWorld, 3000);
});
