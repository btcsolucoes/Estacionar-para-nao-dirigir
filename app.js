const parkingOptions = [
  {
    id: "paco",
    name: "Estac. Paço Alfândega",
    address: "Rua Madre de Deus, Recife Antigo",
    price: 18,
    walkMinutes: 5,
    driveMinutes: 12,
    distanceMeters: 420,
    availability: "Alta",
    traffic: "low",
    occupancy: 42,
  },
  {
    id: "riomar",
    name: "Estac. RioMar Recife",
    address: "Av. República do Líbano",
    price: 12,
    walkMinutes: 15,
    driveMinutes: 18,
    distanceMeters: 980,
    availability: "Média",
    traffic: "medium",
    occupancy: 66,
  },
  {
    id: "bairro",
    name: "Estac. Bairro do Recife",
    address: "Av. Alfredo Lisboa",
    price: 20,
    walkMinutes: 8,
    driveMinutes: 22,
    distanceMeters: 610,
    availability: "Baixa",
    traffic: "high",
    occupancy: 88,
  },
  {
    id: "cais",
    name: "Garagem Cais do Apolo",
    address: "Cais do Apolo, 222",
    price: 15,
    walkMinutes: 11,
    driveMinutes: 15,
    distanceMeters: 760,
    availability: "Média",
    traffic: "medium",
    occupancy: 71,
  },
];

const modeOptions = [
  { id: "walk", label: "A pé", icon: "A", minutes: 5, cost: "R$ 0,00" },
  { id: "bike", label: "Bike", icon: "B", minutes: 3, cost: "R$ 4,00" },
  { id: "uber", label: "Uber", icon: "U", minutes: 4, cost: "R$ 11,00" },
  { id: "shuttle", label: "Shuttle", icon: "S", minutes: 7, cost: "R$ 0,00" },
  { id: "bus", label: "Ônibus", icon: "O", minutes: 10, cost: "R$ 4,10" },
];

const trafficLabels = {
  low: { label: "Pouco movimento", className: "status-low" },
  medium: { label: "Movimento moderado", className: "status-medium" },
  high: { label: "Muito congestionado", className: "status-high" },
};

const state = {
  view: "search",
  sort: "score",
  selectedMode: "walk",
  destination: "Marco Zero, Recife - PE",
  arrivalTime: "20:00",
  selectedParkingId: "paco",
  history: JSON.parse(localStorage.getItem("parkingZeroHistory") || "[]"),
};

const viewTitles = {
  search: "Buscar estacionamentos",
  results: "Comparar opções",
  route: "Resumo da rota",
  traffic: "Mapa de trânsito",
  history: "Histórico",
};

const mainView = document.querySelector("#main-view");
const contextView = document.querySelector("#context-view");
const title = document.querySelector("#view-title");
const navItems = document.querySelectorAll(".nav-item");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function calculateScore(option) {
  const priceScore = Math.max(0, 30 - option.price);
  const distanceScore = Math.max(0, 30 - option.walkMinutes * 1.5);
  const trafficScore = option.traffic === "low" ? 25 : option.traffic === "medium" ? 15 : 5;
  const availabilityScore = option.availability === "Alta" ? 20 : option.availability === "Média" ? 12 : 4;

  return Math.round(priceScore + distanceScore + trafficScore + availabilityScore);
}

function getSortedOptions() {
  return [...parkingOptions].sort((a, b) => {
    if (state.sort === "price") return a.price - b.price;
    if (state.sort === "distance") return a.walkMinutes - b.walkMinutes;
    if (state.sort === "traffic") return a.driveMinutes - b.driveMinutes;
    return calculateScore(b) - calculateScore(a);
  });
}

function getRecommendedOption() {
  return [...parkingOptions].sort((a, b) => calculateScore(b) - calculateScore(a))[0];
}

function getSelectedParking() {
  return parkingOptions.find((option) => option.id === state.selectedParkingId) || getRecommendedOption();
}

function getSelectedMode() {
  return modeOptions.find((mode) => mode.id === state.selectedMode) || modeOptions[0];
}

function statusPill(traffic) {
  const status = trafficLabels[traffic];
  return `<span class="status-pill ${status.className}">${status.label}</span>`;
}

function availabilityPill(availability) {
  const className = availability === "Baixa" ? "status-limited" : availability === "Média" ? "status-medium" : "status-low";
  return `<span class="status-pill ${className}">${availability} disponibilidade</span>`;
}

function renderSearch() {
  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Para onde você vai?</h3>
          <p>Informe o destino e escolha como pretende seguir depois de estacionar.</p>
        </div>
      </div>

      <form class="form-grid" id="search-form">
        <div class="field">
          <label for="destination">Destino no Recife Antigo</label>
          <input id="destination" name="destination" value="${state.destination}" autocomplete="off" />
        </div>

        <div class="field">
          <label for="arrival-time">Horário previsto</label>
          <select id="arrival-time" name="arrivalTime">
            ${["18:00", "19:00", "20:00", "21:00"].map((time) => `
              <option value="${time}" ${state.arrivalTime === time ? "selected" : ""}>Hoje, ${time}</option>
            `).join("")}
          </select>
        </div>

        <div>
          <p class="fieldset-label">Como você pretende se deslocar depois?</p>
          <div class="mode-grid">
            ${modeOptions.map((mode) => `
              <button class="mode-button ${state.selectedMode === mode.id ? "is-selected" : ""}" type="button" data-mode="${mode.id}">
                <span aria-hidden="true">${mode.icon}</span>
                ${mode.label}
              </button>
            `).join("")}
          </div>
        </div>

        <button class="primary-button" type="submit">Buscar estacionamentos</button>
      </form>
    </section>
  `;

  renderRecommendationContext();
}

function renderResults() {
  const recommended = getRecommendedOption();
  const options = getSortedOptions();

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Estacionamentos encontrados</h3>
          <p>Comparação por preço, caminhada, trânsito, disponibilidade e score.</p>
        </div>
        <button class="secondary-button" type="button" data-view-jump="route">Ver rota</button>
      </div>

      <div class="chip-row" aria-label="Ordenação">
        ${[
          ["score", "Melhor score"],
          ["price", "Preço"],
          ["distance", "Distância"],
          ["traffic", "Trânsito"],
        ].map(([id, label]) => `
          <button class="chip ${state.sort === id ? "is-active" : ""}" type="button" data-sort="${id}">${label}</button>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="parking-list">
        ${options.map((option) => parkingCard(option, option.id === recommended.id)).join("")}
      </div>
    </section>
  `;

  renderRecommendationContext();
}

function parkingCard(option, recommended) {
  return `
    <article class="parking-card ${recommended ? "is-recommended" : ""}">
      <div class="parking-main">
        <h4>${option.name}</h4>
        <p>${option.address}</p>
        <div class="chip-row">
          ${recommended ? `<span class="status-pill status-low">Melhor escolha</span>` : ""}
          ${statusPill(option.traffic)}
          ${availabilityPill(option.availability)}
        </div>
        <div class="parking-meta">
          <div class="meta-item"><span>Preço</span><strong>${formatCurrency(option.price)}</strong></div>
          <div class="meta-item"><span>Caminhada</span><strong>${option.walkMinutes} min</strong></div>
          <div class="meta-item"><span>Distância</span><strong>${option.distanceMeters} m</strong></div>
          <div class="meta-item"><span>Ocupação</span><strong>${option.occupancy}%</strong></div>
        </div>
      </div>
      <button class="score-badge" type="button" data-select-parking="${option.id}" aria-label="Selecionar ${option.name}">
        <strong>${calculateScore(option)}</strong>
        <span>score</span>
      </button>
    </article>
  `;
}

function renderRoute() {
  const parking = getSelectedParking();
  const mode = getSelectedMode();

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Resumo da rota</h3>
          <p>O carro para no estacionamento recomendado e o trecho final segue por ${mode.label.toLowerCase()}.</p>
        </div>
        <button class="secondary-button" type="button" data-save-history="true">Salvar no histórico</button>
      </div>

      <div class="route-steps">
        <div class="route-step">
          <span class="step-index">1</span>
          <div>
            <h4>Ir até ${parking.name}</h4>
            <p>${parking.driveMinutes} min de carro até uma área com melhor condição para estacionar.</p>
          </div>
          ${statusPill(parking.traffic)}
        </div>
        <div class="route-step">
          <span class="step-index">2</span>
          <div>
            <h4>Estacionar e deixar o carro parado</h4>
            <p>${availabilityPill(parking.availability)} por ${formatCurrency(parking.price)}.</p>
          </div>
          <strong>${calculateScore(parking)} pts</strong>
        </div>
        <div class="route-step">
          <span class="step-index">3</span>
          <div>
            <h4>Seguir até ${state.destination}</h4>
            <p>${mode.minutes} min usando ${mode.label.toLowerCase()}, custo estimado ${mode.cost}.</p>
          </div>
          <button class="text-button" type="button" data-view-jump="results">Trocar opção</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Alternativas após estacionar</h3>
          <p>Compare o trecho final sem usar o carro dentro do Recife Antigo.</p>
        </div>
      </div>
      <div class="mode-alternatives">
        ${modeOptions.map((item) => `
          <article class="alternative-card">
            <h4>${item.label}</h4>
            <p>${item.minutes} min até o destino final.</p>
            <div class="mini-grid">
              <div class="mini-item"><span>Custo</span><strong>${item.cost}</strong></div>
              <div class="mini-item"><span>Status</span><strong>${item.id === state.selectedMode ? "Selecionado" : "Disponível"}</strong></div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;

  renderRecommendationContext();
}

function renderTraffic() {
  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Mapa de trânsito</h3>
          <p>Visualização simulada do fluxo nos principais pontos do Recife Antigo.</p>
        </div>
      </div>

      <div class="map-panel" aria-label="Mapa de trânsito simulado">
        <span class="map-road road-a"></span>
        <span class="map-road road-b"></span>
        <span class="map-road road-c"></span>
        <div class="traffic-zone zone-low">
          <strong>Paço Alfândega</strong>
          ${statusPill("low")}
        </div>
        <div class="traffic-zone zone-medium">
          <strong>Cais do Apolo</strong>
          ${statusPill("medium")}
        </div>
        <div class="traffic-zone zone-high">
          <strong>Marco Zero</strong>
          ${statusPill("high")}
        </div>
      </div>
    </section>
  `;

  contextView.innerHTML = `
    <section class="context-section">
      <h3>Leitura rápida</h3>
      <p>Quanto mais próximo do Marco Zero, maior o risco de congestionamento e menor a vantagem de continuar circulando de carro.</p>
    </section>
    <section class="context-section">
      <h3>Código de cores</h3>
      <div class="parking-list">
        ${statusPill("low")}
        ${statusPill("medium")}
        ${statusPill("high")}
      </div>
    </section>
  `;
}

function renderHistory() {
  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Histórico</h3>
          <p>Rotas e estacionamentos usados ficam salvos neste navegador.</p>
        </div>
      </div>

      ${state.history.length === 0 ? `
        <div class="empty-state">Nenhuma rota salva ainda.</div>
      ` : `
        <div class="history-list">
          ${state.history.map((item) => `
            <article class="history-item">
              <div>
                <h4>${item.parkingName}</h4>
                <p>${item.destination} · ${item.modeLabel} · ${item.savedAt}</p>
              </div>
              <strong>${item.score} pts</strong>
            </article>
          `).join("")}
        </div>
      `}
    </section>
  `;

  contextView.innerHTML = `
    <section class="context-section">
      <h3>Uso acadêmico</h3>
      <p>O histórico ajuda a demonstrar recorrência de escolhas, economia de tempo e padrão de mobilidade urbana.</p>
    </section>
  `;
}

function renderRecommendationContext() {
  const parking = getSelectedParking();
  const mode = getSelectedMode();

  contextView.innerHTML = `
    <section class="context-section">
      <div class="recommendation">
        <div class="recommendation-hero">
          <div class="score-badge">
            <strong>${calculateScore(parking)}</strong>
            <span>score</span>
          </div>
          <div>
            <h3>Melhor opção para você</h3>
            <p>${parking.name}</p>
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-item"><span>Preço</span><strong>${formatCurrency(parking.price)}</strong></div>
          <div class="detail-item"><span>Até o destino</span><strong>${parking.walkMinutes} min</strong></div>
          <div class="detail-item"><span>Depois de estacionar</span><strong>${mode.label}</strong></div>
          <div class="detail-item"><span>Custo final</span><strong>${mode.cost}</strong></div>
        </div>
      </div>
    </section>

    <section class="context-section">
      <h3>Por que recomenda?</h3>
      <p>O score combina proximidade, preço, fluxo de trânsito e disponibilidade para reduzir circulação de carro no Recife Antigo.</p>
    </section>
  `;
}

function saveHistory() {
  const parking = getSelectedParking();
  const mode = getSelectedMode();
  const now = new Date();
  const entry = {
    id: `${parking.id}-${now.getTime()}`,
    parkingName: parking.name,
    destination: state.destination,
    modeLabel: mode.label,
    score: calculateScore(parking),
    savedAt: now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  state.history = [entry, ...state.history].slice(0, 6);
  localStorage.setItem("parkingZeroHistory", JSON.stringify(state.history));
  state.view = "history";
  render();
}

function render() {
  title.textContent = viewTitles[state.view];

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === state.view);
  });

  if (state.view === "search") renderSearch();
  if (state.view === "results") renderResults();
  if (state.view === "route") renderRoute();
  if (state.view === "traffic") renderTraffic();
  if (state.view === "history") renderHistory();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-view-jump]");
  const mode = event.target.closest("[data-mode]");
  const sort = event.target.closest("[data-sort]");
  const parking = event.target.closest("[data-select-parking]");
  const save = event.target.closest("[data-save-history]");

  if (nav) {
    state.view = nav.dataset.view;
    render();
  }

  if (jump) {
    state.view = jump.dataset.viewJump;
    render();
  }

  if (mode) {
    state.selectedMode = mode.dataset.mode;
    render();
  }

  if (sort) {
    state.sort = sort.dataset.sort;
    render();
  }

  if (parking) {
    state.selectedParkingId = parking.dataset.selectParking;
    state.view = "route";
    render();
  }

  if (save) {
    saveHistory();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "search-form") return;

  event.preventDefault();
  const data = new FormData(event.target);
  state.destination = data.get("destination") || state.destination;
  state.arrivalTime = data.get("arrivalTime") || state.arrivalTime;
  state.selectedParkingId = getRecommendedOption().id;
  state.view = "results";
  render();
});

document.querySelector("#reset-button").addEventListener("click", () => {
  state.destination = "Marco Zero, Recife - PE";
  state.arrivalTime = "20:00";
  state.selectedMode = "walk";
  state.selectedParkingId = "paco";
  state.sort = "score";
  state.view = "search";
  render();
});

render();
