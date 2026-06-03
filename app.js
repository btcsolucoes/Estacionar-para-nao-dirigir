const destinations = [
  { id: "marco-zero", name: "Marco Zero", area: "Praça Rio Branco", load: 5, anchor: 5, lat: -8.0631, lng: -34.8711 },
  { id: "paco-frevo", name: "Paço do Frevo", area: "Rua da Guia", load: 4, anchor: 4, lat: -8.0618, lng: -34.8718 },
  { id: "rua-moeda", name: "Rua da Moeda", area: "Polo noturno", load: 5, anchor: 6, lat: -8.0647, lng: -34.8723 },
  { id: "cais-sertao", name: "Cais do Sertão", area: "Armazéns do Porto", load: 3, anchor: 7, lat: -8.0609, lng: -34.8703 },
  { id: "arsenal", name: "Praça do Arsenal", area: "Bairro do Recife", load: 4, anchor: 3, lat: -8.0619, lng: -34.8708 },
  { id: "porto-digital", name: "Porto Digital", area: "Rua do Apolo", load: 3, anchor: 2, lat: -8.0602, lng: -34.8727 },
  { id: "teatro-apolo", name: "Teatro Apolo", area: "Rua do Recife", load: 4, anchor: 4, lat: -8.0628, lng: -34.8732 },
  { id: "embaixada", name: "Embaixada dos Bonecos", area: "Rua do Bom Jesus", load: 4, anchor: 5, lat: -8.0612, lng: -34.8714 },
  { id: "terminal", name: "Terminal Marítimo", area: "Porto do Recife", load: 2, anchor: 8, lat: -8.058, lng: -34.8697 },
  { id: "alfandega", name: "Shopping Paço Alfândega", area: "Madre de Deus", load: 3, anchor: 5, lat: -8.0644, lng: -34.872 },
  { id: "bom-jesus", name: "Rua do Bom Jesus", area: "Polo gastronômico", load: 5, anchor: 5, lat: -8.0612, lng: -34.8713 },
  { id: "armazem", name: "Armazém 14", area: "Porto", load: 3, anchor: 8, lat: -8.0583, lng: -34.8697 },
];

const timeSlots = [
  { value: "07:00", tag: "manhã leve", pressure: 1, price: 0 },
  { value: "08:00", tag: "entrada", pressure: 2, price: 2 },
  { value: "09:00", tag: "entrada", pressure: 2, price: 2 },
  { value: "10:00", tag: "calmo", pressure: 0, price: 0 },
  { value: "12:00", tag: "almoço", pressure: 1, price: 1 },
  { value: "14:00", tag: "calmo", pressure: 0, price: 0 },
  { value: "16:00", tag: "pré-pico", pressure: 2, price: 2 },
  { value: "17:00", tag: "pico", pressure: 3, price: 4 },
  { value: "18:00", tag: "pico forte", pressure: 4, price: 5 },
  { value: "19:00", tag: "evento", pressure: 4, price: 6 },
  { value: "20:00", tag: "evento", pressure: 3, price: 5 },
  { value: "21:00", tag: "noite", pressure: 2, price: 3 },
  { value: "22:00", tag: "noite", pressure: 2, price: 2 },
  { value: "23:00", tag: "saída", pressure: 3, price: 2 },
];

const modes = [
  { id: "walk", name: "A pé", minutes: 0, cost: 0, note: "sem custo e sem espera" },
  { id: "bike", name: "Bike", minutes: -2, cost: 0, note: "melhor para distâncias médias" },
  { id: "uber", name: "Uber", minutes: 2, cost: 14, note: "bom para noite ou chuva" },
  { id: "shuttle", name: "Shuttle", minutes: 4, cost: 4, note: "circular de evento" },
  { id: "bus", name: "Ônibus", minutes: 8, cost: 4.3, note: "barato, mas depende de intervalo" },
];

const parkingLots = [
  { id: "paco", name: "Estac. Paço Alfândega", address: "Rua Madre de Deus", zone: "Centro", hourly: 18, event: 45, daily: 72, baseAvailability: 70, baseDrive: 10, baseWalk: 4, driveKm: 4.2, anchor: 5, traffic: "médio", note: "mais perto dos polos históricos", lat: -8.0644, lng: -34.872 },
  { id: "alfredo", name: "Garagem Alfredo Lisboa", address: "Av. Alfredo Lisboa", zone: "Porto", hourly: 20, event: 52, daily: 86, baseAvailability: 42, baseDrive: 13, baseWalk: 7, driveKm: 4.9, anchor: 6, traffic: "alto", note: "perto, mas sofre em eventos", lat: -8.061, lng: -34.8697 },
  { id: "apolo", name: "Garagem Cais do Apolo", address: "Cais do Apolo, 222", zone: "Apolo", hourly: 15, event: 38, daily: 65, baseAvailability: 66, baseDrive: 12, baseWalk: 8, driveKm: 4.6, anchor: 2, traffic: "médio", note: "equilíbrio entre preço e acesso", lat: -8.0588, lng: -34.873 },
  { id: "riomar", name: "Estac. RioMar Recife", address: "Av. República do Líbano", zone: "Fora do miolo", hourly: 12, event: 35, daily: 58, baseAvailability: 84, baseDrive: 18, baseWalk: 15, driveKm: 6.8, anchor: 0, traffic: "baixo", note: "bom para deixar o carro fora do centro", lat: -8.0859, lng: -34.8915 },
  { id: "santo", name: "Ed. Garagem Santo Antônio", address: "Rua do Carmo", zone: "Santo Antônio", hourly: 10, event: 32, daily: 48, baseAvailability: 74, baseDrive: 16, baseWalk: 12, driveKm: 5.1, anchor: 1, traffic: "baixo", note: "barato, com trecho final maior", lat: -8.0669, lng: -34.8783 },
  { id: "portuaria", name: "Zona Portuária", address: "Cais do Porto", zone: "Borda norte", hourly: 14, event: 36, daily: 60, baseAvailability: 78, baseDrive: 15, baseWalk: 10, driveKm: 5.7, anchor: 8, traffic: "baixo", note: "boa para Cais e Terminal", lat: -8.058, lng: -34.8688 },
  { id: "bomjesus", name: "Pátio Bom Jesus", address: "Rua do Bom Jesus", zone: "Histórico", hourly: 22, event: 58, daily: 92, baseAvailability: 35, baseDrive: 15, baseWalk: 5, driveKm: 4.5, anchor: 5, traffic: "alto", note: "conveniente, caro e disputado", lat: -8.0612, lng: -34.8713 },
  { id: "capibaribe", name: "Bolso Capibaribe", address: "Rua da Aurora", zone: "Borda oeste", hourly: 9, event: 28, daily: 44, baseAvailability: 80, baseDrive: 17, baseWalk: 13, driveKm: 5.9, anchor: 2, traffic: "baixo", note: "menor preço para quem aceita caminhar", lat: -8.0605, lng: -34.8767 },
  { id: "terminal", name: "Terminal Marítimo", address: "Av. Alfredo Lisboa", zone: "Terminal", hourly: 16, event: 42, daily: 70, baseAvailability: 62, baseDrive: 14, baseWalk: 9, driveKm: 4.8, anchor: 8, traffic: "médio", note: "funciona bem perto dos armazéns", lat: -8.0577, lng: -34.8698 },
];

const featureStatuses = [
  { id: 1, title: "Buscar estacionamentos", status: "ok", detail: "destino, horário e perfil recalculam opções" },
  { id: 2, title: "Comparar opções", status: "ok", detail: "preço, distância, caminhada, vagas, trânsito e score" },
  { id: 3, title: "Mapa e navegação real", status: "ok", detail: "OpenStreetMap com atalhos Waze e Google Maps" },
  { id: 4, title: "Sugerir troca modal", status: "ok", detail: "a pé, bike, Uber, shuttle e ônibus" },
  { id: 5, title: "Exibir áreas críticas", status: "ok", detail: "camadas e alertas no mapa real" },
  { id: 6, title: "Estimar tempo da rota", status: "ok", detail: "tempo local + abertura no Waze para trânsito real" },
  { id: 7, title: "Receber relatos", status: "ok", detail: "formulário e lista persistente no navegador" },
  { id: 8, title: "Recomendar regiões estratégicas", status: "ok", detail: "bolsões e estacionamentos recomendados" },
  { id: 9, title: "Salvar histórico", status: "ok", detail: "favoritos e histórico no localStorage" },
  { id: 10, title: "Funcionalidade 10", status: "pending", detail: "não foi enviada/definida nos prints" },
];

const defaultReports = [
  { type: "Trânsito", place: "Rua do Bom Jesus", detail: "fluxo intenso perto dos bares", minutes: 8 },
  { type: "Vagas", place: "Paço Alfândega", detail: "poucas vagas cobertas", minutes: 14 },
  { type: "Rua", place: "Rua da Moeda", detail: "bloqueio parcial para montagem", minutes: 23 },
  { type: "Preço", place: "Garagem Alfredo Lisboa", detail: "pacote acima da média", minutes: 31 },
];

const state = {
  view: "overview",
  destinationId: "marco-zero",
  time: "20:00",
  modeId: "walk",
  profile: "balanced",
  sort: "score",
  selectedLotId: "paco",
  favorites: readStore().favorites,
  history: readStore().history,
  reports: readStore().reports,
};

const els = {
  view: document.getElementById("app-view"),
  destination: document.getElementById("destination-select"),
  time: document.getElementById("time-select"),
  profile: document.getElementById("profile-select"),
  modes: document.getElementById("mode-tabs"),
  reset: document.getElementById("reset-button"),
  flow: document.getElementById("status-flow"),
  saving: document.getElementById("status-saving"),
  options: document.getElementById("status-options"),
};

function readStore() {
  try {
    const raw = JSON.parse(localStorage.getItem("parking-zero-v3") || "{}");
    return {
      favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
      history: Array.isArray(raw.history) ? raw.history : [],
      reports: Array.isArray(raw.reports) ? raw.reports : defaultReports,
    };
  } catch (error) {
    return { favorites: [], history: [], reports: defaultReports };
  }
}

function persist() {
  localStorage.setItem(
    "parking-zero-v3",
    JSON.stringify({
      favorites: state.favorites,
      history: state.history.slice(0, 12),
      reports: state.reports.slice(0, 12),
    }),
  );
}

function findBy(list, value) {
  return list.find(function (item) {
    return item.id === value || item.value === value;
  }) || list[0];
}

function money(value) {
  return "R$ " + value.toFixed(value % 1 === 0 ? 0 : 2).replace(".", ",");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wazeUrl(point) {
  return "https://www.waze.com/ul?ll=" + point.lat + "%2C" + point.lng + "&navigate=yes&zoom=17";
}

function googleRouteUrl(point) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + point.lat + "," + point.lng + "&travelmode=driving";
}

function currentScenario() {
  const destination = findBy(destinations, state.destinationId);
  const slot = findBy(timeSlots, state.time);
  const pressure = clamp(destination.load + slot.pressure, 1, 10);
  return { destination: destination, slot: slot, pressure: pressure };
}

function enrichedLots() {
  const scenario = currentScenario();
  const mode = findBy(modes, state.modeId);
  return parkingLots.map(function (lot) {
    const distance = Math.abs(lot.anchor - scenario.destination.anchor);
    const trafficPenalty = lot.traffic === "alto" ? 7 : lot.traffic === "médio" ? 4 : 1;
    const availability = clamp(lot.baseAvailability - scenario.pressure * 5 - distance * 3 - trafficPenalty, 6, 96);
    const walkRaw = clamp(lot.baseWalk + distance * 2 + Math.round(scenario.destination.load / 2), 3, 24);
    const finalWalk = Math.max(3, walkRaw + mode.minutes);
    const drive = clamp(lot.baseDrive + scenario.pressure * 2 + trafficPenalty, 8, 42);
    const eventPrice = lot.event + scenario.slot.price;
    const score = clamp(Math.round(112 - eventPrice * 0.55 - drive * 0.6 - finalWalk + availability * 0.65), 12, 98);
    return Object.assign({}, lot, {
      availability: Math.round(availability),
      occupancy: 100 - Math.round(availability),
      walkRaw: walkRaw,
      walk: finalWalk,
      drive: drive,
      total: drive + finalWalk,
      eventPrice: eventPrice,
      totalCost: eventPrice + mode.cost,
      modalCost: mode.cost,
      score: score,
    });
  });
}

function sortedLots() {
  const list = enrichedLots();
  const profileSort = {
    cheap: "price",
    fast: "total",
    safe: "availability",
    balanced: state.sort,
  }[state.profile];
  list.sort(function (a, b) {
    if (profileSort === "price") return a.eventPrice - b.eventPrice;
    if (profileSort === "walk") return a.walk - b.walk;
    if (profileSort === "total") return a.total - b.total;
    if (profileSort === "availability") return b.availability - a.availability;
    return b.score - a.score;
  });
  return list;
}

function selectedLot() {
  return findBy(enrichedLots(), state.selectedLotId);
}

function bestLot() {
  return sortedLots()[0];
}

function badgeClass(value) {
  if (value >= 60) return "good";
  if (value >= 35) return "warn";
  return "bad";
}

function populateControls() {
  els.destination.innerHTML = destinations.map(function (destination) {
    return `<option value="${destination.id}">${destination.name} - ${destination.area}</option>`;
  }).join("");
  els.time.innerHTML = timeSlots.map(function (slot) {
    return `<option value="${slot.value}">${slot.value} - ${slot.tag}</option>`;
  }).join("");
  els.modes.innerHTML = modes.map(function (mode) {
    return `<button type="button" data-mode="${mode.id}">${mode.name}</button>`;
  }).join("");
}

function syncControls() {
  els.destination.value = state.destinationId;
  els.time.value = state.time;
  els.profile.value = state.profile;
  document.querySelectorAll("[data-mode]").forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.mode === state.modeId);
  });
  document.querySelectorAll("[data-view]").forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
}

function updateHeader() {
  const scenario = currentScenario();
  const best = bestLot();
  els.flow.textContent = scenario.pressure >= 8 ? "Intenso" : scenario.pressure >= 5 ? "Moderado" : "Leve";
  els.saving.textContent = Math.max(8, Math.round((100 - best.score) / 2)) + " min";
  els.options.textContent = sortedLots().length;
}

function render() {
  state.selectedLotId = state.selectedLotId || bestLot().id;
  syncControls();
  updateHeader();
  if (state.view === "compare") renderCompare();
  else if (state.view === "route") renderRoute();
  else if (state.view === "map") renderMap();
  else if (state.view === "saved") renderSaved();
  else renderOverview();
  hydrateMap();
}

function renderOverview() {
  const lot = bestLot();
  const scenario = currentScenario();
  state.selectedLotId = lot.id;
  els.view.innerHTML = `
    <div class="dashboard-grid">
      <div class="stack">
        <section class="panel">
          <div class="decision">
            <div>
              <span class="badge blue">Recomendado agora</span>
              <h2>${lot.name}</h2>
              <p>${lot.note}. Para ${scenario.destination.name} às ${state.time}, essa opção equilibra custo, vagas e tempo sem obrigar o motorista a circular no miolo.</p>
            </div>
            <div class="score"><strong>${lot.score}</strong><span>score</span></div>
          </div>
          <div class="metrics">
            ${metric("Pacote", money(lot.eventPrice), "hora " + money(lot.hourly) + " / diária " + money(lot.daily))}
            ${metric("Tempo total", lot.total + " min", lot.drive + " carro + " + lot.walk + " final")}
            ${metric("Vagas", lot.availability + "%", lot.occupancy + "% de ocupação")}
            ${metric("Destino", scenario.destination.name, scenario.destination.area)}
          </div>
          <div class="actions">
            <button class="primary-button" type="button" data-select="${lot.id}" data-go="route">Usar esta rota</button>
            <button class="secondary-button" type="button" data-go="compare">Comparar preços</button>
            <button class="secondary-button" type="button" data-favorite="${lot.id}">${isFavorite(lot.id) ? "Remover favorito" : "Salvar favorito"}</button>
            <a class="route-link waze-link" href="${wazeUrl(lot)}" target="_blank" rel="noopener">Abrir no Waze</a>
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <h3>Top 4 opções</h3>
              <p>Preço, disponibilidade e tempo lado a lado.</p>
            </div>
          </div>
          <div class="lot-grid">
            ${sortedLots().slice(0, 4).map(compactLot).join("")}
          </div>
        </section>

        <section class="panel color-panel">
          <div class="panel-header">
            <div>
              <h3>Funcionalidades 1 a 10</h3>
              <p>Status real com base nas funcionalidades enviadas.</p>
            </div>
          </div>
          <div class="feature-grid">
            ${featureStatuses.map(featureCard).join("")}
          </div>
        </section>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>Mapa real</h3>
            <p>OpenStreetMap com estacionamentos, destino, áreas críticas e atalhos de rota.</p>
          </div>
        </div>
        ${mapMarkup()}
      </section>
    </div>
  `;
}

function metric(label, value, help) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><p>${help}</p></article>`;
}

function compactLot(lot) {
  return `
    <article class="lot-card ${state.selectedLotId === lot.id ? "is-selected" : ""}">
      <div class="lot-top">
        <div>
          <span class="badge ${badgeClass(lot.availability)}">${lot.availability}% vagas</span>
          <h3>${lot.name}</h3>
          <p>${lot.zone} - ${lot.note}</p>
        </div>
        <div class="mini-score">${lot.score}</div>
      </div>
      <div class="metrics">
        ${metric("Pacote", money(lot.eventPrice), "hora " + money(lot.hourly))}
        ${metric("Total", lot.total + " min", lot.drive + " + " + lot.walk)}
        ${metric("Diária", money(lot.daily), "uso longo")}
        ${metric("Trânsito", lot.traffic, lot.address)}
      </div>
      <div class="actions">
        <button class="primary-button" type="button" data-select="${lot.id}" data-go="route">Escolher</button>
        <button class="secondary-button" type="button" data-favorite="${lot.id}">${isFavorite(lot.id) ? "Salvo" : "Salvar"}</button>
        <a class="route-link waze-link" href="${wazeUrl(lot)}" target="_blank" rel="noopener">Waze</a>
        <a class="route-link maps-link" href="${googleRouteUrl(lot)}" target="_blank" rel="noopener">Google Maps</a>
      </div>
    </article>
  `;
}

function renderCompare() {
  els.view.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Comparação direta</h2>
          <p>Ordene do jeito que você quer decidir: score, preço, caminhada, tempo ou vagas.</p>
        </div>
      </div>
      <div class="toolbar">
        ${chip("score", "Melhor score")}
        ${chip("price", "Menor preço")}
        ${chip("walk", "Menor caminhada")}
        ${chip("total", "Menor tempo")}
        ${chip("availability", "Mais vagas")}
      </div>
    </section>
    <section class="lot-grid">
      ${sortedLots().map(compactLot).join("")}
    </section>
  `;
}

function chip(value, label) {
  return `<button class="chip ${state.sort === value ? "is-active" : ""}" type="button" data-sort="${value}">${label}</button>`;
}

function renderRoute() {
  const lot = selectedLot();
  const scenario = currentScenario();
  const mode = findBy(modes, state.modeId);
  els.view.innerHTML = `
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Rota: ${lot.name}</h2>
            <p>${scenario.destination.name} às ${state.time}. Custo total previsto: ${money(lot.totalCost)}.</p>
          </div>
          <span class="badge ${badgeClass(lot.availability)}">${lot.availability}% vagas</span>
        </div>
        <div class="route-list">
          ${routeStep(1, "Dirigir até o estacionamento", lot.drive + " min", lot.driveKm.toFixed(1).replace(".", ",") + " km até " + lot.zone)}
          ${routeStep(2, "Estacionar", money(lot.eventPrice), "Pacote do horário selecionado")}
          ${routeStep(3, "Seguir de " + mode.name, lot.walk + " min", mode.note + " - custo " + money(mode.cost))}
        </div>
        <div class="metrics">
          ${metric("Tempo total", lot.total + " min", "trajeto completo")}
          ${metric("Custo", money(lot.totalCost), "estacionamento + modal")}
          ${metric("Risco", lot.occupancy + "%", "ocupação prevista")}
          ${metric("Score", lot.score, "custo-benefício")}
        </div>
        <div class="actions">
          <button class="primary-button" type="button" data-save-route="${lot.id}">Salvar rota</button>
          <button class="secondary-button" type="button" data-go="map">Ver relatos</button>
          <a class="route-link waze-link" href="${wazeUrl(lot)}" target="_blank" rel="noopener">Abrir estacionamento no Waze</a>
          <a class="route-link maps-link" href="${googleRouteUrl(lot)}" target="_blank" rel="noopener">Abrir no Google Maps</a>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>Trocar modal final</h3>
            <p>O tempo e o custo recalculam na hora.</p>
          </div>
        </div>
        <div class="lot-grid">
          ${modes.map(function (modeItem) {
            const active = modeItem.id === state.modeId;
            const minutes = Math.max(3, lot.walkRaw + modeItem.minutes);
            return `<button class="lot-card ${active ? "is-selected" : ""}" type="button" data-mode="${modeItem.id}">
              <div class="lot-top">
                <div><h3>${modeItem.name}</h3><p>${modeItem.note}</p></div>
                <strong>${minutes} min</strong>
              </div>
              <span>${money(modeItem.cost)}</span>
            </button>`;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

function routeStep(index, title, value, help) {
  return `<article class="route-card"><span class="step">${index}</span><div><h3>${title}</h3><p>${help}</p></div><strong>${value}</strong></article>`;
}

function renderMap() {
  els.view.innerHTML = `
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Mapa real, trânsito e regiões</h2>
            <p>OpenStreetMap mostra os pontos. Waze/Google Maps abrem a rota com dados reais do serviço externo.</p>
          </div>
        </div>
        ${mapMarkup()}
        <div class="split-grid" style="margin-top:12px">
          <div class="panel">
            <h3>Evitar</h3>
            ${infoRow("Rua do Bom Jesus", "Fluxo alto de pedestres e bares")}
            ${infoRow("Rua da Moeda", "Bloqueios parciais em eventos")}
            ${infoRow("Madre de Deus", "Alta procura por vaga coberta")}
          </div>
          <div class="panel">
            <h3>Recomendadas</h3>
            ${infoRow("Zona Portuária", "Boa caminhada para Cais e Terminal")}
            ${infoRow("Santo Antônio", "Preço menor e saída simples")}
            ${infoRow("Borda Capibaribe", "Menos retenção no fim do evento")}
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Relatos</h2>
            <p>Atualizações simuladas de trânsito, vagas, rua e preço.</p>
          </div>
        </div>
        <form class="report-form" id="report-form">
          <select name="type"><option>Trânsito</option><option>Vagas</option><option>Rua</option><option>Preço</option></select>
          <input name="place" placeholder="Local" required />
          <input name="detail" placeholder="Relato" required />
          <button class="primary-button" type="submit">Enviar</button>
        </form>
        <div class="lot-grid">
          ${state.reports.map(function (report) {
            return `<article class="report-card"><div><span class="badge blue">${escapeHtml(report.type)}</span><h3>${escapeHtml(report.place)}</h3><p>${escapeHtml(report.detail)}</p></div><strong>${report.minutes} min</strong></article>`;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

function mapMarkup() {
  return `
    <div class="map-tools">
      <span class="badge good">Estacionamentos</span>
      <span class="badge blue">Destino</span>
      <span class="badge warn">Atenção</span>
      <span class="badge bad">Evitar</span>
    </div>
    <div class="real-map" id="real-map"></div>
    <p class="map-note">O mapa usa OpenStreetMap. Para tempo/trânsito ao vivo, abra a rota no Waze.</p>
  `;
}

function hydrateMap() {
  const node = document.getElementById("real-map");
  if (!node || typeof L === "undefined") return;
  if (window.parkingZeroMap) {
    window.parkingZeroMap.remove();
    window.parkingZeroMap = null;
  }

  const scenario = currentScenario();
  const lot = selectedLot();
  const map = L.map(node, { scrollWheelZoom: false }).setView([-8.063, -34.872], 14);
  window.parkingZeroMap = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  const criticalStyle = { color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.18, weight: 2 };
  const warnStyle = { color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 0.18, weight: 2 };
  L.circle([-8.0612, -34.8713], Object.assign({ radius: 130 }, criticalStyle)).addTo(map).bindPopup("Evitar: Rua do Bom Jesus");
  L.circle([-8.0647, -34.8723], Object.assign({ radius: 115 }, warnStyle)).addTo(map).bindPopup("Atenção: Rua da Moeda");

  sortedLots().forEach(function (item) {
    const marker = L.circleMarker([item.lat, item.lng], {
      radius: item.id === lot.id ? 10 : 7,
      color: item.id === lot.id ? "#0f172a" : "#16a34a",
      fillColor: item.availability >= 60 ? "#22c55e" : item.availability >= 35 ? "#f59e0b" : "#ef4444",
      fillOpacity: 0.88,
      weight: 2,
    }).addTo(map);
    marker.bindPopup(
      `<strong>${item.name}</strong><br>${money(item.eventPrice)} pacote<br>${item.availability}% vagas<br><a href="${wazeUrl(item)}" target="_blank" rel="noopener">Abrir no Waze</a>`,
    );
  });

  L.marker([scenario.destination.lat, scenario.destination.lng]).addTo(map).bindPopup("Destino: " + scenario.destination.name);
  L.polyline([[lot.lat, lot.lng], [scenario.destination.lat, scenario.destination.lng]], {
    color: "#2563eb",
    weight: 4,
    opacity: 0.75,
    dashArray: "8 8",
  }).addTo(map);
  map.fitBounds([[lot.lat, lot.lng], [scenario.destination.lat, scenario.destination.lng]], { padding: [42, 42], maxZoom: 16 });
  setTimeout(function () {
    map.invalidateSize();
  }, 80);
}

function infoRow(title, detail) {
  return `<article class="saved-card"><div><h3>${title}</h3><p>${detail}</p></div></article>`;
}

function renderSaved() {
  const favoriteLots = state.favorites.map(function (id) {
    return findBy(enrichedLots(), id);
  });
  els.view.innerHTML = `
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header"><div><h2>Favoritos</h2><p>Estacionamentos salvos para usar de novo.</p></div></div>
        <div class="lot-grid">
          ${favoriteLots.length ? favoriteLots.map(compactLot).join("") : `<div class="empty-state">Nenhum favorito salvo ainda.</div>`}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2>Histórico</h2><p>Últimas escolhas feitas no protótipo.</p></div></div>
        <div class="lot-grid">
          ${state.history.length ? state.history.map(function (item) {
            return `<article class="saved-card"><div><h3>${escapeHtml(item.lotName)}</h3><p>${escapeHtml(item.destination)} às ${escapeHtml(item.time)} - ${item.total} min</p></div><strong>${money(item.price)}</strong></article>`;
          }).join("") : `<div class="empty-state">Escolha uma rota para iniciar o histórico.</div>`}
        </div>
      </section>
      <section class="panel color-panel">
        <div class="panel-header"><div><h2>Funcionalidades 1 a 10</h2><p>A 10 ainda depende da sua explicação.</p></div></div>
        <div class="feature-grid">${featureStatuses.map(featureCard).join("")}</div>
      </section>
    </div>
  `;
}

function featureCard(feature) {
  const label = feature.status === "ok" ? "Funcionando" : "Pendente";
  const color = feature.status === "ok" ? "good" : "warn";
  return `<article class="feature-card">
    <span class="feature-number">${feature.id}</span>
    <div>
      <h3>${feature.title}</h3>
      <p>${feature.detail}</p>
    </div>
    <span class="badge ${color}">${label}</span>
  </article>`;
}

function isFavorite(id) {
  return state.favorites.indexOf(id) >= 0;
}

function selectLot(id) {
  state.selectedLotId = id;
  const lot = selectedLot();
  const scenario = currentScenario();
  state.history = [{
    id: Date.now(),
    lotId: lot.id,
    lotName: lot.name,
    destination: scenario.destination.name,
    time: state.time,
    total: lot.total,
    price: lot.totalCost,
  }].concat(state.history.filter(function (item) {
    return item.lotId !== lot.id || item.destination !== scenario.destination.name || item.time !== state.time;
  })).slice(0, 12);
  persist();
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    state.favorites = state.favorites.filter(function (favorite) {
      return favorite !== id;
    });
  } else {
    state.favorites = [id].concat(state.favorites);
  }
  persist();
}

document.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.view) {
    state.view = button.dataset.view;
    render();
    return;
  }

  if (button.dataset.go) {
    state.view = button.dataset.go;
    render();
    return;
  }

  if (button.dataset.mode) {
    state.modeId = button.dataset.mode;
    render();
    return;
  }

  if (button.dataset.sort) {
    state.sort = button.dataset.sort;
    state.profile = "balanced";
    render();
    return;
  }

  if (button.dataset.select) {
    selectLot(button.dataset.select);
    if (button.dataset.go) state.view = button.dataset.go;
    render();
    return;
  }

  if (button.dataset.favorite) {
    toggleFavorite(button.dataset.favorite);
    render();
    return;
  }

  if (button.dataset.saveRoute) {
    selectLot(button.dataset.saveRoute);
    state.view = "saved";
    render();
  }
});

document.getElementById("search-form").addEventListener("change", function () {
  state.destinationId = els.destination.value;
  state.time = els.time.value;
  state.profile = els.profile.value;
  state.selectedLotId = bestLot().id;
  render();
});

document.addEventListener("submit", function (event) {
  if (!event.target.matches("#report-form")) return;
  event.preventDefault();
  const form = event.target;
  state.reports = [{
    type: form.elements.type.value,
    place: form.elements.place.value.trim(),
    detail: form.elements.detail.value.trim(),
    minutes: 0,
  }].concat(state.reports).slice(0, 12);
  persist();
  render();
});

els.reset.addEventListener("click", function () {
  state.view = "overview";
  state.destinationId = "marco-zero";
  state.time = "20:00";
  state.modeId = "walk";
  state.profile = "balanced";
  state.sort = "score";
  state.selectedLotId = bestLot().id;
  render();
});

populateControls();
state.selectedLotId = bestLot().id;
render();
