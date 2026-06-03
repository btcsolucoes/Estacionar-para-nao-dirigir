const parkingOptions = [
  {
    id: "paco",
    name: "Estac. Paço Alfândega",
    address: "Rua Madre de Deus, Recife Antigo",
    price: 18,
    walkMinutes: 5,
    driveMinutes: 12,
    driveKm: 4.2,
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
    driveKm: 6.4,
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
    driveKm: 5.1,
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
    driveKm: 4.8,
    distanceMeters: 760,
    availability: "Média",
    traffic: "medium",
    occupancy: 71,
  },
];

const modeOptions = [
  {
    id: "walk",
    label: "A pé",
    icon: "A",
    minutes: 5,
    cost: "R$ 0,00",
    detail: "Grátis",
    impact: "Mais rápido e econômico para um trecho final curto.",
  },
  {
    id: "bike",
    label: "Bike",
    icon: "B",
    minutes: 3,
    cost: "R$ 4,00",
    detail: "~150 kcal",
    impact: "Boa opção quando há bicicleta compartilhada próxima.",
  },
  {
    id: "uber",
    label: "Uber",
    icon: "U",
    minutes: 4,
    cost: "R$ 11,00",
    detail: "R$ 10 - 15",
    impact: "Útil em chuva, bagagem ou baixa mobilidade.",
  },
  {
    id: "shuttle",
    label: "Shuttle",
    icon: "S",
    minutes: 7,
    cost: "R$ 0,00",
    detail: "R$ 4,00",
    impact: "Reduz carros individuais em eventos e horários de pico.",
  },
  {
    id: "bus",
    label: "Ônibus",
    icon: "O",
    minutes: 10,
    cost: "R$ 4,10",
    detail: "Linha local",
    impact: "Alternativa coletiva para deslocamentos um pouco maiores.",
  },
];

const trafficLabels = {
  low: { label: "Pouco movimento", className: "status-low" },
  medium: { label: "Movimento moderado", className: "status-medium" },
  high: { label: "Muito congestionado", className: "status-high" },
};

const criticalAreas = [
  {
    name: "Marco Zero",
    type: "Muito congestionado",
    className: "status-high",
    reason: "Trânsito intenso e alta concentração de veículos e pedestres no destino final.",
    x: 35,
    y: 72,
  },
  {
    name: "Cais do Apolo",
    type: "Congestionamento moderado",
    className: "status-medium",
    reason: "Retenção no acesso aos estacionamentos e áreas de embarque.",
    x: 74,
    y: 22,
  },
  {
    name: "Estac. Bairro do Recife",
    type: "Alta lotação",
    className: "status-high",
    reason: "Ocupação elevada e risco de perda de tempo procurando vaga.",
    x: 65,
    y: 55,
  },
  {
    name: "Rua da Moeda",
    type: "Bloqueio parcial",
    className: "status-limited",
    reason: "Rua parcialmente bloqueada e baixa disponibilidade de vagas avulsas.",
    x: 18,
    y: 38,
  },
];

const strategicRegions = [
  {
    id: "portuaria",
    name: "Zona Portuária",
    walkMinutes: 10,
    reason: "Fica fora do miolo mais congestionado e permite seguir a pé ou de bike.",
    traffic: "low",
    availability: "Alta",
    x: 17,
    y: 62,
  },
  {
    id: "santo",
    name: "Santo Antônio",
    walkMinutes: 12,
    reason: "Boa área de apoio para eventos, reduzindo a disputa por vaga no Marco Zero.",
    traffic: "medium",
    availability: "Média",
    x: 58,
    y: 42,
  },
  {
    id: "apolo",
    name: "Cais do Apolo",
    walkMinutes: 8,
    reason: "Região intermediária para estacionar e terminar o trajeto sem circular no centro crítico.",
    traffic: "medium",
    availability: "Média",
    x: 78,
    y: 28,
  },
];

const initialReports = [
  {
    id: "report-traffic",
    category: "Trânsito",
    title: "Trânsito intenso na Rua do Bom Jesus",
    place: "Rua do Bom Jesus",
    detail: "Alto fluxo agora há pouco; evite seguir de carro até o centro crítico.",
    age: "Agora há pouco",
    className: "status-high",
  },
  {
    id: "report-vacancy",
    category: "Vagas",
    title: "Estac. Bairro do Recife lotado",
    place: "Av. Alfredo Lisboa",
    detail: "Relato de baixa disponibilidade para o horário selecionado.",
    age: "10 min atrás",
    className: "status-limited",
  },
  {
    id: "report-street",
    category: "Rua",
    title: "Rua da Moeda parcialmente bloqueada",
    place: "Rua da Moeda",
    detail: "Trecho com retenção e circulação difícil.",
    age: "25 min atrás",
    className: "status-medium",
  },
];

const state = {
  view: "search",
  sort: "score",
  selectedMode: "walk",
  destination: "Marco Zero, Recife - PE",
  arrivalTime: "20:00",
  selectedParkingId: "paco",
  reportFilter: "Todos",
  reports: JSON.parse(localStorage.getItem("parkingZeroReports") || "null") || initialReports,
  favorites: JSON.parse(localStorage.getItem("parkingZeroFavorites") || "[]"),
  history: JSON.parse(localStorage.getItem("parkingZeroHistory") || "[]"),
};

const viewTitles = {
  search: "Buscar estacionamentos",
  results: "Comparar opções",
  recommended: "Melhor opção recomendada",
  route: "Resumo da rota",
  alternatives: "Alternativas após estacionar",
  traffic: "Regiões e relatos",
  history: "Salvos",
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

function getTotalRouteMinutes(parking = getSelectedParking(), mode = getSelectedMode()) {
  return parking.driveMinutes + mode.minutes;
}

function getRecommendedMode(parking = getSelectedParking()) {
  if (parking.walkMinutes <= 8) return modeOptions.find((mode) => mode.id === "walk");
  return modeOptions.find((mode) => mode.id === "bike");
}

function getRouteImpact(parking = getSelectedParking(), mode = getSelectedMode()) {
  const circulationRisk = parking.traffic === "high" ? 18 : parking.traffic === "medium" ? 12 : 8;
  const savedMinutes = Math.max(6, Math.round(circulationRisk + parking.occupancy / 12 - mode.minutes / 3));
  const avoidedKm = Math.max(1.1, Number((parking.distanceMeters / 1000 + parking.occupancy / 100).toFixed(1)));

  return {
    savedMinutes,
    avoidedKm,
  };
}

function getHistorySummary() {
  const totalRoutes = state.history.length;
  const savedMinutes = state.history.reduce((sum, item) => sum + (item.savedMinutes || 0), 0);
  const averageScore = totalRoutes
    ? Math.round(state.history.reduce((sum, item) => sum + item.score, 0) / totalRoutes)
    : 0;
  const modeCounts = state.history.reduce((counts, item) => {
    counts[item.modeLabel] = (counts[item.modeLabel] || 0) + 1;
    return counts;
  }, {});
  const topModeEntry = Object.entries(modeCounts).sort((a, b) => b[1] - a[1])[0];
  const topMode = topModeEntry ? topModeEntry[0] : "Sem dados";

  return {
    totalRoutes,
    savedMinutes,
    averageScore,
    topMode,
  };
}

function getFavoriteParkings() {
  return state.favorites
    .map((id) => parkingOptions.find((option) => option.id === id))
    .filter(Boolean);
}

function isFavorite(parkingId) {
  return state.favorites.includes(parkingId);
}

function getFilteredReports() {
  if (state.reportFilter === "Todos") return state.reports;
  return state.reports.filter((report) => report.category === state.reportFilter);
}

function getBestStrategicRegion() {
  return [...strategicRegions].sort((a, b) => {
    const trafficScore = (region) => region.traffic === "low" ? 0 : region.traffic === "medium" ? 1 : 2;
    return trafficScore(a) - trafficScore(b) || a.walkMinutes - b.walkMinutes;
  })[0];
}

function statusPill(traffic) {
  const status = trafficLabels[traffic];
  return `<span class="status-pill ${status.className}">${status.label}</span>`;
}

function availabilityPill(availability) {
  const className = availability === "Baixa" ? "status-limited" : availability === "Média" ? "status-medium" : "status-low";
  return `<span class="status-pill ${className}">${availability} disponibilidade</span>`;
}

function typedPill(label, className) {
  return `<span class="status-pill ${className}">${label}</span>`;
}

function renderSearch() {
  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Para onde você vai?</h3>
          <p>Encontre estacionamentos disponíveis próximos ao destino ou evento no Recife Antigo para evitar voltas desnecessárias.</p>
        </div>
      </div>

      <form class="form-grid" id="search-form">
        <div class="field">
          <label for="destination">Destino ou evento no Recife Antigo</label>
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
          <p>Compare preço, distância até o evento, caminhada, vagas disponíveis e congestionamento para escolher o melhor custo-benefício.</p>
        </div>
        <button class="secondary-button" type="button" data-view-jump="recommended">Ver melhor opção</button>
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

function renderRecommended() {
  const recommended = getRecommendedOption();
  const selected = getSelectedParking();
  const activeParking = selected.id === recommended.id ? recommended : selected;

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Melhor opção para você</h3>
          <p>Score calculado com mobilidade, fluxo de trânsito, custo, proximidade e disponibilidade.</p>
        </div>
        <button class="secondary-button" type="button" data-view-jump="route">Ver rota</button>
      </div>

      <div class="recommendation-hero">
        <div class="score-badge">
          <strong>${calculateScore(activeParking)}</strong>
          <span>score</span>
        </div>
        <div>
          <h3>${activeParking.name}</h3>
          <p>${activeParking.address}</p>
          <div class="chip-row">
            ${activeParking.id === recommended.id ? `<span class="status-pill status-low">Melhor escolha</span>` : ""}
            ${statusPill(activeParking.traffic)}
            ${availabilityPill(activeParking.availability)}
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Critérios avaliados</h3>
          <p>A recomendação favorece estacionar fora da área crítica e terminar o deslocamento por outro modal.</p>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-item"><span>Preço</span><strong>${formatCurrency(activeParking.price)}</strong></div>
        <div class="detail-item"><span>Distância final</span><strong>${activeParking.distanceMeters} m</strong></div>
        <div class="detail-item"><span>Tempo a pé</span><strong>${activeParking.walkMinutes} min</strong></div>
        <div class="detail-item"><span>Tempo de carro</span><strong>${activeParking.driveMinutes} min</strong></div>
        <div class="detail-item"><span>Disponibilidade</span><strong>${activeParking.availability}</strong></div>
        <div class="detail-item"><span>Ocupação estimada</span><strong>${activeParking.occupancy}%</strong></div>
      </div>
    </section>
  `;

  renderRecommendationContext();
}

function parkingCard(option, recommended) {
  const favorite = isFavorite(option.id);

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
          <div class="meta-item"><span>Até o evento</span><strong>${option.distanceMeters} m</strong></div>
          <div class="meta-item"><span>Caminhada</span><strong>${option.walkMinutes} min</strong></div>
          <div class="meta-item"><span>Ocupação</span><strong>${option.occupancy}%</strong></div>
        </div>
        <div class="card-actions">
          <button class="text-button" type="button" data-toggle-favorite="${option.id}">
            ${favorite ? "Remover favorito" : "Salvar favorito"}
          </button>
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
  const totalMinutes = getTotalRouteMinutes(parking, mode);
  const impact = getRouteImpact(parking, mode);
  const favorite = isFavorite(parking.id);

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Resumo da rota</h3>
          <p>Tempo total calculado com percurso de carro, estacionamento escolhido e trecho final até o destino.</p>
        </div>
        <div class="button-group">
          <button class="secondary-button" type="button" data-toggle-favorite="${parking.id}">${favorite ? "Favorito salvo" : "Salvar favorito"}</button>
          <button class="secondary-button" type="button" data-save-history="true">Salvar rota</button>
        </div>
      </div>

      <div class="route-metrics" aria-label="Estimativa detalhada da rota">
        <div class="route-metric">
          <span>Até o estacionamento</span>
          <strong>${parking.driveMinutes} min</strong>
          <p>${parking.driveKm.toFixed(1)} km de carro até ${parking.name}.</p>
        </div>
        <div class="route-metric">
          <span>Trecho final</span>
          <strong>${mode.minutes} min</strong>
          <p>${parking.distanceMeters} m usando ${mode.label.toLowerCase()} até ${state.destination}.</p>
        </div>
        <div class="route-metric">
          <span>Tempo total estimado</span>
          <strong>${totalMinutes} min</strong>
          <p>Previsão da viagem completa, do carro ao destino.</p>
        </div>
      </div>

      <div class="route-steps">
        <div class="route-step">
          <span class="step-index">1</span>
          <div>
            <h4>Ir até ${parking.name}</h4>
            <p>${parking.driveMinutes} min de carro, ${parking.driveKm.toFixed(1)} km, até uma área com melhor condição para estacionar.</p>
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
          <button class="text-button" type="button" data-view-jump="alternatives">Ver modais</button>
        </div>
      </div>

      <div class="route-total-card" aria-label="Tempo total estimado da rota">
        <div>
          <span>Tempo total estimado</span>
          <strong>Deslocamento completo</strong>
          <p>${parking.driveMinutes} min de carro + ${mode.minutes} min no trecho final.</p>
        </div>
        <strong>${totalMinutes} min</strong>
      </div>

      <button class="primary-button route-start" type="button" data-view-jump="alternatives">Iniciar navegação</button>

      <div class="impact-grid" aria-label="Impacto estimado da escolha">
        <div class="impact-card">
          <span>Tempo evitado</span>
          <strong>${impact.savedMinutes} min</strong>
          <p>Estimativa de circulação que deixa de acontecer na área crítica.</p>
        </div>
        <div class="impact-card">
          <span>Carro fora do miolo</span>
          <strong>${impact.avoidedKm} km</strong>
          <p>Trecho que deixa de ser disputado por vaga no Recife Antigo.</p>
        </div>
      </div>
    </section>
  `;

  renderRecommendationContext();
}

function renderAlternatives() {
  const parking = getSelectedParking();
  const recommendedMode = getRecommendedMode(parking);

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Alternativas após estacionar</h3>
          <p>Depois de estacionar em ${parking.name}, escolha como chegar ao destino sem voltar a circular de carro pelo Recife Antigo.</p>
        </div>
        <button class="secondary-button" type="button" data-view-jump="route">Voltar para rota</button>
      </div>
      <div class="modal-recommendation">
        <strong>Recomendamos: ${recommendedMode.label}</strong>
        <p>${recommendedMode.impact}</p>
      </div>
      <div class="mode-alternatives">
        ${modeOptions.map((item) => `
          <article class="alternative-card ${item.id === state.selectedMode ? "is-selected" : ""}">
            <h4>${item.label}</h4>
            <p>${item.impact}</p>
            <div class="mini-grid">
              <div class="mini-item"><span>Tempo</span><strong>${item.minutes} min</strong></div>
              <div class="mini-item"><span>Custo</span><strong>${item.cost}</strong></div>
              <div class="mini-item"><span>Detalhe</span><strong>${item.detail}</strong></div>
              <div class="mini-item"><span>Status</span><strong>${item.id === recommendedMode.id ? "Recomendado" : "Disponível"}</strong></div>
              <div class="mini-item"><span>Total rota</span><strong>${getTotalRouteMinutes(parking, item)} min</strong></div>
            </div>
            <button class="select-link text-button" type="button" data-mode="${item.id}">${item.id === state.selectedMode ? "Modal atual" : "Escolher modal"}</button>
          </article>
        `).join("")}
      </div>
      <button class="primary-button route-start" type="button" data-view-jump="route">Iniciar rota</button>
    </section>
  `;

  renderRecommendationContext();
}

function renderTraffic() {
  const bestRegion = getBestStrategicRegion();
  const filteredReports = getFilteredReports();

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Mapa de trânsito e regiões</h3>
          <p>Visualize trânsito intenso, alta lotação, bloqueios, baixa disponibilidade e áreas estratégicas antes de circular pelo Recife Antigo.</p>
        </div>
      </div>

      <div class="map-panel" aria-label="Mapa de trânsito, áreas críticas e regiões estratégicas">
        <span class="map-road road-a"></span>
        <span class="map-road road-b"></span>
        <span class="map-road road-c"></span>
        ${strategicRegions.map((region) => `
          <div class="traffic-zone strategic-zone" style="left: ${region.x}%; top: ${region.y}%;">
            <strong>${region.name}</strong>
            ${statusPill(region.traffic)}
          </div>
        `).join("")}
        ${criticalAreas.map((area) => `
          <div class="traffic-zone critical-zone" style="left: ${area.x}%; top: ${area.y}%;">
            <strong>${area.name}</strong>
            ${typedPill(area.type, area.className)}
          </div>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Áreas críticas</h3>
          <p>Evite regiões com trânsito intenso, alta lotação, bloqueios ou pouca disponibilidade de vagas.</p>
        </div>
      </div>
      <div class="critical-list">
        ${criticalAreas.map((area) => `
          <article class="critical-item">
            <div>
              <h4>${area.name}</h4>
              <p>${area.reason}</p>
            </div>
            ${typedPill(area.type, area.className)}
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Áreas estratégicas</h3>
          <p>A recomendação distribui melhor os carros pela região e evita excesso de circulação no Marco Zero.</p>
        </div>
      </div>
      <div class="critical-list">
        ${strategicRegions.map((region) => `
          <article class="critical-item">
            <div>
              <h4>${region.name}</h4>
              <p>${region.reason}</p>
            </div>
            <div class="mini-stack">
              ${availabilityPill(region.availability)}
              <strong>${region.walkMinutes} min a pé</strong>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Relatos da comunidade</h3>
          <p>Informações em tempo real sobre trânsito, vagas indisponíveis, preços abusivos e ruas interditadas.</p>
        </div>
      </div>

      <div class="chip-row" aria-label="Filtrar relatos">
        ${["Todos", "Trânsito", "Vagas", "Rua", "Preço"].map((filter) => `
          <button class="chip ${state.reportFilter === filter ? "is-active" : ""}" type="button" data-report-filter="${filter}">${filter}</button>
        `).join("")}
      </div>

      <div class="report-list">
        ${filteredReports.map((report) => `
          <article class="report-item">
            <div>
              <h4>${report.title}</h4>
              <p>${report.place} · ${report.detail}</p>
              <span>${report.age}</span>
            </div>
            ${typedPill(report.category, report.className)}
          </article>
        `).join("")}
      </div>

      <form class="report-form" id="report-form">
        <div class="field">
          <label for="report-category">Tipo de relato</label>
          <select id="report-category" name="category">
            <option>Trânsito</option>
            <option>Vagas</option>
            <option>Rua</option>
            <option>Preço</option>
          </select>
        </div>
        <div class="field">
          <label for="report-place">Local</label>
          <input id="report-place" name="place" value="Rua da Moeda" autocomplete="off" />
        </div>
        <div class="field field-wide">
          <label for="report-detail">O que está acontecendo?</label>
          <input id="report-detail" name="detail" value="Relato rápido para atualizar outros usuários." autocomplete="off" />
        </div>
        <button class="primary-button" type="submit">Enviar relato</button>
      </form>
    </section>
  `;

  contextView.innerHTML = `
    <section class="context-section">
      <h3>Melhor região agora</h3>
      <p>${bestRegion.name} aparece como alternativa estratégica para estacionar fora do maior fluxo e seguir ${bestRegion.walkMinutes} min a pé.</p>
    </section>
    <section class="context-section">
      <h3>Alertas críticos</h3>
      <div class="detail-grid">
        <div class="detail-item"><span>Áreas críticas</span><strong>${criticalAreas.length}</strong></div>
        <div class="detail-item"><span>Maior risco</span><strong>Marco Zero</strong></div>
        <div class="detail-item"><span>Bloqueio</span><strong>Rua da Moeda</strong></div>
        <div class="detail-item"><span>Lotação</span><strong>Bairro do Recife</strong></div>
      </div>
    </section>
    <section class="context-section">
      <h3>Relatos ativos</h3>
      <div class="detail-grid">
        <div class="detail-item"><span>Total</span><strong>${state.reports.length}</strong></div>
        <div class="detail-item"><span>Filtro</span><strong>${state.reportFilter}</strong></div>
        <div class="detail-item"><span>Trânsito</span><strong>${state.reports.filter((report) => report.category === "Trânsito").length}</strong></div>
        <div class="detail-item"><span>Vagas</span><strong>${state.reports.filter((report) => report.category === "Vagas").length}</strong></div>
      </div>
    </section>
  `;
}

function renderHistory() {
  const summary = getHistorySummary();
  const favorites = getFavoriteParkings();

  mainView.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Favoritos e histórico</h3>
          <p>Salve estacionamentos e rotas preferidas para acessar rápido em eventos recorrentes.</p>
        </div>
        <div class="button-group">
          <button class="secondary-button" type="button" data-toggle-favorite="${state.selectedParkingId}">
            ${isFavorite(state.selectedParkingId) ? "Favorito salvo" : "Salvar opção atual"}
          </button>
          ${state.history.length > 0 ? `<button class="secondary-button" type="button" data-clear-history="true">Limpar histórico</button>` : ""}
        </div>
      </div>

      <div class="history-summary" aria-label="Resumo do histórico">
        <div class="summary-card">
          <span>Favoritos</span>
          <strong>${favorites.length}</strong>
        </div>
        <div class="summary-card">
          <span>Rotas salvas</span>
          <strong>${summary.totalRoutes}</strong>
        </div>
        <div class="summary-card">
          <span>Modal mais usado</span>
          <strong>${summary.topMode}</strong>
        </div>
        <div class="summary-card">
          <span>Score médio</span>
          <strong>${summary.averageScore || "-"}</strong>
        </div>
      </div>

      <div class="section-header section-subheader">
        <div>
          <h3>Estacionamentos favoritos</h3>
          <p>Opções preferidas para reutilizar sem refazer a busca.</p>
        </div>
      </div>

      ${favorites.length === 0 ? `
        <div class="empty-state">Nenhum estacionamento favorito ainda.</div>
      ` : `
        <div class="history-list">
          ${favorites.map((parking) => `
            <article class="history-item">
              <div>
                <h4>${parking.name}</h4>
                <p>${parking.address} · ${parking.walkMinutes} min a pé · ${formatCurrency(parking.price)} · ${parking.availability} disponibilidade</p>
              </div>
              <div class="history-actions">
                <strong>${calculateScore(parking)} pts</strong>
                <button class="text-button" type="button" data-select-parking="${parking.id}">Usar</button>
                <button class="text-button" type="button" data-toggle-favorite="${parking.id}">Remover</button>
              </div>
            </article>
          `).join("")}
        </div>
      `}
    </section>

    <section class="section">
      <div class="section-header section-subheader">
        <div>
          <h3>Rotas salvas</h3>
          <p>Registro das escolhas usadas para voltar a uma rota em poucos toques.</p>
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
                <p>${item.destination} · ${item.modeLabel} · ${item.totalMinutes ? `${item.totalMinutes} min` : "tempo não registrado"} · ${item.savedMinutes || 0} min evitados · ${item.savedAt}</p>
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
      <h3>Acesso rápido</h3>
      <p>Favoritos e rotas salvas reduzem o tempo de decisão em eventos recorrentes no Recife Antigo.</p>
    </section>
    <section class="context-section">
      <h3>Leitura acumulada</h3>
      <div class="detail-grid">
        <div class="detail-item"><span>Favoritos</span><strong>${favorites.length}</strong></div>
        <div class="detail-item"><span>Rotas analisadas</span><strong>${summary.totalRoutes}</strong></div>
        <div class="detail-item"><span>Tempo evitado</span><strong>${summary.savedMinutes} min</strong></div>
        <div class="detail-item"><span>Modal dominante</span><strong>${summary.topMode}</strong></div>
        <div class="detail-item"><span>Score médio</span><strong>${summary.averageScore || "-"}</strong></div>
      </div>
    </section>
  `;
}

function renderRecommendationContext() {
  const parking = getSelectedParking();
  const mode = getSelectedMode();
  const impact = getRouteImpact(parking, mode);

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
          <div class="detail-item"><span>Tempo total</span><strong>${getTotalRouteMinutes(parking, mode)} min</strong></div>
          <div class="detail-item"><span>Tempo evitado</span><strong>${impact.savedMinutes} min</strong></div>
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
  const impact = getRouteImpact(parking, mode);
  const now = new Date();
  const entry = {
    id: `${parking.id}-${now.getTime()}`,
    parkingName: parking.name,
    destination: state.destination,
    arrivalTime: state.arrivalTime,
    modeLabel: mode.label,
    totalMinutes: getTotalRouteMinutes(parking, mode),
    savedMinutes: impact.savedMinutes,
    avoidedKm: impact.avoidedKm,
    score: calculateScore(parking),
    savedAt: now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  if (!isFavorite(parking.id)) {
    state.favorites = [parking.id, ...state.favorites].slice(0, 8);
    localStorage.setItem("parkingZeroFavorites", JSON.stringify(state.favorites));
  }

  state.history = [entry, ...state.history].slice(0, 6);
  localStorage.setItem("parkingZeroHistory", JSON.stringify(state.history));
  state.view = "history";
  render();
}

function toggleFavorite(parkingId) {
  if (isFavorite(parkingId)) {
    state.favorites = state.favorites.filter((id) => id !== parkingId);
  } else {
    state.favorites = [parkingId, ...state.favorites].slice(0, 8);
  }

  localStorage.setItem("parkingZeroFavorites", JSON.stringify(state.favorites));
  render();
}

function clearHistory() {
  state.history = [];
  localStorage.removeItem("parkingZeroHistory");
  render();
}

function addReport(data) {
  const category = data.get("category") || "Trânsito";
  const place = data.get("place") || "Recife Antigo";
  const detail = data.get("detail") || "Relato enviado por usuário.";
  const className = category === "Trânsito" ? "status-high" : category === "Vagas" ? "status-limited" : category === "Rua" ? "status-medium" : "status-high";

  const report = {
    id: `report-${Date.now()}`,
    category,
    title: `${category} em ${place}`,
    place,
    detail,
    age: "Agora",
    className,
  };

  state.reports = [report, ...state.reports].slice(0, 8);
  state.reportFilter = "Todos";
  localStorage.setItem("parkingZeroReports", JSON.stringify(state.reports));
  render();
}

function render() {
  title.textContent = viewTitles[state.view];

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === state.view);
  });

  if (state.view === "search") renderSearch();
  if (state.view === "results") renderResults();
  if (state.view === "recommended") renderRecommended();
  if (state.view === "route") renderRoute();
  if (state.view === "alternatives") renderAlternatives();
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
  const clear = event.target.closest("[data-clear-history]");
  const favorite = event.target.closest("[data-toggle-favorite]");
  const reportFilter = event.target.closest("[data-report-filter]");

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
    if (state.view === "alternatives") {
      state.view = "route";
    }
    render();
  }

  if (sort) {
    state.sort = sort.dataset.sort;
    render();
  }

  if (parking) {
    state.selectedParkingId = parking.dataset.selectParking;
    state.view = "recommended";
    render();
  }

  if (save) {
    saveHistory();
  }

  if (clear) {
    clearHistory();
  }

  if (favorite) {
    toggleFavorite(favorite.dataset.toggleFavorite);
  }

  if (reportFilter) {
    state.reportFilter = reportFilter.dataset.reportFilter;
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "report-form") {
    event.preventDefault();
    addReport(new FormData(event.target));
    return;
  }

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
  state.reportFilter = "Todos";
  state.view = "search";
  render();
});

render();
