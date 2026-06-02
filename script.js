const parkings = [
  {
    id: "paco",
    name: "Estac. Paco Alfandega",
    price: 18,
    distanceKm: 4.2,
    driveMin: 12,
    finalMeters: 350,
    finalMin: 5,
    availability: "Alta",
    availabilityLevel: "high",
    traffic: "Moderado",
    score: 92,
    reason:
      "Fica perto do destino, tem boa disponibilidade e reduz a circulacao de carro no miolo do Recife Antigo.",
  },
  {
    id: "cais",
    name: "Garagem Cais do Porto",
    price: 15,
    distanceKm: 4.8,
    driveMin: 16,
    finalMeters: 640,
    finalMin: 9,
    availability: "Media",
    availabilityLevel: "medium",
    traffic: "Intenso",
    score: 78,
    reason:
      "Tem custo menor, mas o acesso passa por uma regiao mais congestionada no horario selecionado.",
  },
  {
    id: "bairro",
    name: "Estac. Bairro do Recife",
    price: 22,
    distanceKm: 3.9,
    driveMin: 14,
    finalMeters: 520,
    finalMin: 7,
    availability: "Baixa",
    availabilityLevel: "low",
    traffic: "Alerta",
    score: 71,
    reason:
      "E proximo, porem a disponibilidade de vagas esta baixa e pode aumentar o tempo procurando estacionamento.",
  },
];

const modes = {
  walk: {
    label: "A pe",
    time: 5,
    cost: "Gratis",
    detail: "Melhor para distancias curtas e para evitar novo deslocamento motorizado.",
    impact: "Menor custo e menor impacto no fluxo de veiculos.",
  },
  bike: {
    label: "Bike",
    time: 6,
    cost: "~150 kcal",
    detail: "Boa alternativa quando ha ciclofaixa ou bicicleta compartilhada proxima.",
    impact: "Mantem o trajeto leve sem aumentar o transito local.",
  },
  uber: {
    label: "Uber",
    time: 7,
    cost: "R$ 10 - 15",
    detail: "Indicado para chuva, bagagem ou baixa mobilidade.",
    impact: "Confortavel, mas ainda adiciona veiculo na area central.",
  },
  shuttle: {
    label: "Shuttle Centro",
    time: 8,
    cost: "R$ 4,00",
    detail: "Opcao compartilhada para eventos e horarios de pico.",
    impact: "Reduz carros individuais dentro do Recife Antigo.",
  },
  bus: {
    label: "Transporte publico",
    time: 11,
    cost: "R$ 4,10",
    detail: "Funciona melhor quando ha integracao proxima ao estacionamento.",
    impact: "Boa escolha coletiva quando o tempo extra e aceitavel.",
  },
};

const criticalAreas = [
  {
    name: "Av. Alfredo Lisboa",
    status: "Muito congestionado",
    badge: "red",
    detail: "Fluxo intenso proximo aos acessos do Marco Zero.",
  },
  {
    name: "Rua do Recife",
    status: "Congestionado",
    badge: "yellow",
    detail: "Retencao moderada por embarque e desembarque.",
  },
  {
    name: "Entorno do Paco Alfandega",
    status: "Pouco movimento",
    badge: "green",
    detail: "Trecho recomendado para finalizar o percurso a pe.",
  },
  {
    name: "Vagas na Rua da Moeda",
    status: "Baixa disponibilidade",
    badge: "red",
    detail: "Evitar procurar vaga avulsa no horario selecionado.",
  },
];

const state = {
  activeScreen: "search",
  selectedParkingId: "paco",
  selectedMode: "walk",
  destination: "Marco Zero",
  arrivalTime: "18:30",
  history: JSON.parse(localStorage.getItem("parkingZeroHistory") || "[]"),
};

const titles = {
  search: "Buscar destino",
  parkings: "Estacionamentos encontrados",
  recommended: "Melhor opcao recomendada",
  route: "Resumo da rota",
  modal: "Alternativas apos estacionar",
  traffic: "Mapa de transito",
  history: "Historico",
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function getSelectedParking() {
  return parkings.find((parking) => parking.id === state.selectedParkingId) || parkings[0];
}

function getRecommendedParking() {
  return [...parkings].sort((a, b) => b.score - a.score)[0];
}

function getSelectedMode() {
  return modes[state.selectedMode] || modes.walk;
}

function totalTime(parking = getSelectedParking(), mode = getSelectedMode()) {
  return parking.driveMin + mode.time;
}

function navigate(screen) {
  state.activeScreen = screen;
  document.querySelectorAll(".screen").forEach((section) => {
    section.classList.toggle("active", section.id === screen);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === screen);
  });
  document.getElementById("screen-title").textContent = titles[screen];
}

function renderParkings() {
  const list = document.getElementById("parking-list");
  list.innerHTML = parkings
    .map(
      (parking) => `
        <article class="parking-card ${parking.id === state.selectedParkingId ? "selected" : ""}">
          <div class="card-title-row">
            <h3>${parking.name}</h3>
            <span class="availability ${parking.availabilityLevel}">${parking.availability}</span>
          </div>
          <p>${parking.reason}</p>
          <div class="card-meta">
            <div><span>Preco</span><strong>${currency.format(parking.price)}</strong></div>
            <div><span>Carro</span><strong>${parking.driveMin} min</strong></div>
            <div><span>Final</span><strong>${parking.finalMeters} m</strong></div>
          </div>
          <button class="select-link" type="button" data-parking="${parking.id}">
            ${parking.id === state.selectedParkingId ? "Selecionado" : "Escolher"}
          </button>
        </article>
      `,
    )
    .join("");

  document.getElementById("parking-count").textContent = `${parkings.length} opcoes`;
}

function renderRecommendation() {
  const recommended = getRecommendedParking();
  const selected = getSelectedParking();
  document.getElementById("recommended-name").textContent = recommended.name;
  document.getElementById("recommended-reason").textContent = recommended.reason;
  document.getElementById("recommended-score").textContent = `${recommended.score}/100`;
  document.getElementById("quick-recommendation").textContent = selected.name;
  document.getElementById("quick-time").textContent = `${totalTime()} min`;
  document.getElementById("quick-cost").textContent = currency.format(selected.price);
  document.getElementById("quick-final").textContent = getSelectedMode().label;
  document.getElementById("selected-parking-label").textContent = selected.name;

  const trafficStatus = document.getElementById("traffic-status");
  trafficStatus.textContent = `Transito ${selected.traffic.toLowerCase()}`;

  document.getElementById("criteria-list").innerHTML = [
    ["Preco", currency.format(recommended.price)],
    ["Distancia ate estacionamento", `${recommended.distanceKm.toFixed(1)} km`],
    ["Tempo de carro", `${recommended.driveMin} min`],
    ["Trecho final ate o destino", `${recommended.finalMeters} m`],
    ["Disponibilidade", recommended.availability],
  ]
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");
}

function renderRoute() {
  const parking = getSelectedParking();
  const mode = getSelectedMode();
  document.getElementById("route-summary").innerHTML = `
    <article class="route-card">
      <div class="route-row">
        <div>
          <span>Ate o estacionamento</span>
          <strong>${parking.name}</strong>
        </div>
        <strong>${parking.driveMin} min - ${parking.distanceKm.toFixed(1)} km</strong>
      </div>
    </article>
    <article class="route-card">
      <div class="route-row">
        <div>
          <span>Do estacionamento ate ${state.destination}</span>
          <strong>${mode.label}</strong>
        </div>
        <strong>${mode.time} min - ${parking.finalMeters} m</strong>
      </div>
    </article>
    <article class="route-card total">
      <div class="route-row">
        <div>
          <span>Tempo total estimado</span>
          <strong>Deslocamento completo</strong>
        </div>
        <strong>${totalTime(parking, mode)} min</strong>
      </div>
    </article>
  `;
}

function renderModalOptions() {
  const selectedMode = getSelectedMode();
  document.getElementById("modal-options").innerHTML = Object.entries(modes)
    .map(
      ([key, mode]) => `
        <article class="modal-card ${key === state.selectedMode ? "selected" : ""}">
          <div class="card-title-row">
            <h3>${mode.label}</h3>
            <span class="badge ${key === "walk" ? "green" : key === "uber" ? "yellow" : "blue"}">${mode.time} min</span>
          </div>
          <div class="card-meta">
            <div><span>Custo</span><strong>${mode.cost}</strong></div>
            <div><span>Perfil</span><strong>${key === "walk" ? "Recomendado" : "Alternativa"}</strong></div>
          </div>
          <p>${mode.detail}</p>
          <button class="select-link" type="button" data-mode="${key}">
            ${key === state.selectedMode ? "Selecionado" : "Escolher"}
          </button>
        </article>
      `,
    )
    .join("");

  document.getElementById("modal-decision").innerHTML = `
    <h3>Recomendamos: ${selectedMode.label}</h3>
    <p>${selectedMode.impact}</p>
  `;
}

function renderTraffic() {
  document.getElementById("critical-list").innerHTML = criticalAreas
    .map(
      (area) => `
        <li>
          <div>
            <strong>${area.name}</strong>
            <span>${area.detail}</span>
          </div>
          <span class="badge ${area.badge}">${area.status}</span>
        </li>
      `,
    )
    .join("");
}

function renderHistory() {
  const list = document.getElementById("history-list");
  if (!state.history.length) {
    list.innerHTML = `
      <article class="history-card empty">
        <strong>Nenhuma rota iniciada ainda.</strong>
      </article>
    `;
    return;
  }

  list.innerHTML = state.history
    .map(
      (item) => `
        <article class="history-card">
          <h3>${item.destination}</h3>
          <div class="card-meta">
            <div><span>Estacionamento</span><strong>${item.parking}</strong></div>
            <div><span>Modo final</span><strong>${item.mode}</strong></div>
            <div><span>Tempo</span><strong>${item.time} min</strong></div>
          </div>
          <span class="badge blue">${item.when}</span>
        </article>
      `,
    )
    .join("");
}

function renderAll() {
  renderParkings();
  renderRecommendation();
  renderRoute();
  renderModalOptions();
  renderTraffic();
  renderHistory();
}

function saveHistory() {
  localStorage.setItem("parkingZeroHistory", JSON.stringify(state.history.slice(0, 6)));
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.screen));
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.go));
});

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.destination = document.getElementById("destination").value.trim() || "Marco Zero";
  state.arrivalTime = document.getElementById("arrival-time").value || "18:30";
  state.selectedMode = document.getElementById("preferred-mode").value;
  renderAll();
  navigate("parkings");
});

document.getElementById("parking-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-parking]");
  if (!button) return;
  state.selectedParkingId = button.dataset.parking;
  renderAll();
  navigate("recommended");
});

document.getElementById("modal-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.selectedMode = button.dataset.mode;
  document.getElementById("preferred-mode").value = state.selectedMode;
  renderAll();
});

document.getElementById("start-navigation").addEventListener("click", () => {
  const parking = getSelectedParking();
  const mode = getSelectedMode();
  state.history.unshift({
    destination: state.destination,
    parking: parking.name,
    mode: mode.label,
    time: totalTime(parking, mode),
    when: `${state.arrivalTime} de hoje`,
  });
  state.history = state.history.slice(0, 6);
  saveHistory();
  renderHistory();
  navigate("history");
});

document.getElementById("clear-history").addEventListener("click", () => {
  state.history = [];
  saveHistory();
  renderHistory();
});

renderAll();
