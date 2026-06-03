const STORAGE_KEY = "parking-zero-app-v2";

const originPresets = [
  { name: "Boa Viagem, Recife - PE", lat: -8.1258, lng: -34.9031 },
  { name: "Casa Forte, Recife - PE", lat: -8.0344, lng: -34.9194 },
  { name: "Olinda - PE", lat: -8.0101, lng: -34.8552 },
  { name: "Jaboatão dos Guararapes - PE", lat: -8.112, lng: -35.0154 },
  { name: "São Paulo - SP", lat: -23.5558, lng: -46.6396 },
];

const destinations = [
  { id: "marco", name: "Marco Zero", area: "Recife Antigo", lat: -8.0631, lng: -34.8711 },
  { id: "bom-jesus", name: "Rua do Bom Jesus", area: "Recife Antigo", lat: -8.0614, lng: -34.8717 },
  { id: "paco-frevo", name: "Paço do Frevo", area: "Bairro do Recife", lat: -8.061, lng: -34.8728 },
  { id: "moeda", name: "Rua da Moeda", area: "Recife Antigo", lat: -8.0641, lng: -34.8735 },
  { id: "sertao", name: "Cais do Sertão", area: "Arsenal", lat: -8.0602, lng: -34.8704 },
  { id: "armazem", name: "Armazém 14", area: "Cais", lat: -8.0656, lng: -34.8714 },
  { id: "embaixada", name: "Embaixada dos Bonecos", area: "Bom Jesus", lat: -8.0619, lng: -34.8718 },
  { id: "torre", name: "Torre Malakoff", area: "Arsenal", lat: -8.0604, lng: -34.8732 },
];

const times = [
  "Hoje, 17:30",
  "Hoje, 18:00",
  "Hoje, 19:00",
  "Hoje, 20:00",
  "Hoje, 21:00",
  "Amanhã, 18:00",
  "Sábado, 16:00",
  "Sábado, 20:00",
];

const modes = [
  { id: "walk", label: "A pé", cost: "Grátis", color: "green", pace: 1, icon: "🚶" },
  { id: "bike", label: "Bike", cost: "~150 kcal", color: "blue", pace: 0.55, icon: "🚲" },
  { id: "uber", label: "Uber", cost: "R$ 10-16", color: "purple", pace: 0.42, icon: "🚗" },
  { id: "shuttle", label: "Shuttle", cost: "R$ 4", color: "orange", pace: 0.7, icon: "🚌" },
];

const lots = [
  { id: "paco", name: "Paço Alfândega", lat: -8.0646, lng: -34.8732, price: 18, available: 42, total: 70, traffic: "baixo", safety: 91, distance: 420, drive: 12, tags: ["coberto", "perto do Marco Zero"] },
  { id: "riomar", name: "RioMar Recife", lat: -8.0868, lng: -34.8946, price: 12, available: 130, total: 240, traffic: "médio", safety: 88, distance: 2200, drive: 18, tags: ["mais barato", "muitas vagas"] },
  { id: "bairro", name: "Bairro do Recife", lat: -8.0627, lng: -34.8752, price: 20, available: 12, total: 48, traffic: "alto", safety: 76, distance: 650, drive: 14, tags: ["perto", "fila provável"] },
  { id: "portuaria", name: "Zona Portuária", lat: -8.0592, lng: -34.8694, price: 14, available: 58, total: 90, traffic: "baixo", safety: 83, distance: 760, drive: 15, tags: ["recomendado", "pouco movimento"] },
  { id: "santo", name: "Santo Antônio", lat: -8.0668, lng: -34.8787, price: 10, available: 36, total: 80, traffic: "médio", safety: 79, distance: 1100, drive: 16, tags: ["econômico", "boa saída"] },
  { id: "arsenal", name: "Arsenal", lat: -8.0598, lng: -34.8724, price: 22, available: 9, total: 38, traffic: "alto", safety: 84, distance: 520, drive: 13, tags: ["muito perto", "caro"] },
  { id: "cais", name: "Cais do Apolo", lat: -8.0557, lng: -34.8729, price: 16, available: 44, total: 110, traffic: "baixo", safety: 86, distance: 980, drive: 13, tags: ["saída rápida", "estável"] },
];

const reportsSeed = [
  { id: 1, type: "Trânsito", title: "Fila forte na ponte para o Bairro do Recife", place: "Av. Alfredo Lisboa", minutes: 4, severity: "danger" },
  { id: 2, type: "Vagas", title: "Paço Alfândega com vagas cobertas livres", place: "Paço Alfândega", minutes: 9, severity: "good" },
  { id: 3, type: "Preço", title: "Zona Portuária cobrando R$ 14 fixo", place: "Zona Portuária", minutes: 18, severity: "info" },
  { id: 4, type: "Rua", title: "Rua da Moeda parcialmente bloqueada", place: "Rua da Moeda", minutes: 24, severity: "warn" },
];

const saved = readSaved();
const state = {
  tab: saved.tab || "search",
  originText: saved.originText || originPresets[0].name,
  originLat: saved.originLat || originPresets[0].lat,
  originLng: saved.originLng || originPresets[0].lng,
  originStatus: "",
  destinationText: saved.destinationText || destinations[0].name,
  destinationLat: saved.destinationLat || destinations[0].lat,
  destinationLng: saved.destinationLng || destinations[0].lng,
  destinationStatus: "",
  destinationId: saved.destinationId || "marco",
  time: saved.time || "Hoje, 20:00",
  modeId: saved.modeId || "walk",
  selectedLotId: saved.selectedLotId || "paco",
  sort: saved.sort || "score",
  reportFilter: "Todos",
  favorites: saved.favorites || ["paco", "portuaria"],
  history: saved.history || [],
  reports: saved.reports || reportsSeed,
};

const mapBounds = {
  south: -8.0895,
  west: -34.8998,
  north: -8.0535,
  east: -34.8652,
};

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    tab: state.tab,
    originText: state.originText,
    originLat: state.originLat,
    originLng: state.originLng,
    destinationText: state.destinationText,
    destinationLat: state.destinationLat,
    destinationLng: state.destinationLng,
    destinationId: state.destinationId,
    time: state.time,
    modeId: state.modeId,
    selectedLotId: state.selectedLotId,
    sort: state.sort,
    favorites: state.favorites,
    history: state.history.slice(0, 8),
    reports: state.reports.slice(0, 12),
  }));
}

function destination() {
  return {
    name: state.destinationText || destinations[0].name,
    lat: Number(state.destinationLat),
    lng: Number(state.destinationLng),
  };
}

function selectedLot() {
  return lots.find((item) => item.id === state.selectedLotId) || lots[0];
}

function selectedMode() {
  return modes.find((item) => item.id === state.modeId) || modes[0];
}

function origin() {
  return {
    name: state.originText || "Origem",
    lat: Number(state.originLat),
    lng: Number(state.originLng),
  };
}

function originReady() {
  return Number.isFinite(Number(state.originLat)) && Number.isFinite(Number(state.originLng));
}

function destinationReady() {
  return Number.isFinite(Number(state.destinationLat)) && Number.isFinite(Number(state.destinationLng));
}

function money(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function normalizeText(value) {
  return String(value).trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function walkMinutes(lot, mode = selectedMode()) {
  return Math.max(3, Math.round((walkDistance(lot) / 75) * mode.pace));
}

function driveMinutes(lot) {
  if (!originReady()) return lot.drive;
  const km = distanceKm(origin(), lot);
  const traffic = lot.traffic === "alto" ? 9 : lot.traffic === "médio" ? 5 : 2;
  if (km < 2) return Math.max(6, Math.round(km * 8 + traffic));
  if (km < 35) return Math.round((km / 24) * 60 + traffic);
  return Math.round((km / 68) * 60 + traffic);
}

function totalMinutes(lot, mode = selectedMode()) {
  return driveMinutes(lot) + walkMinutes(lot, mode);
}

function distanceKm(a, b) {
  const radius = 6371;
  const toRad = (value) => value * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function walkDistance(lot) {
  if (!destinationReady()) return lot.distance;
  return Math.max(180, Math.round(distanceKm(lot, destination()) * 1000 * 1.18));
}

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(km < 10 ? 1 : 0).replace(".", ",")} km`;
}

function formatMinutes(minutes) {
  if (minutes < 90) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}min` : `${hours}h`;
}

function availability(lot) {
  return Math.round((lot.available / lot.total) * 100);
}

function trafficPenalty(lot) {
  return lot.traffic === "alto" ? 22 : lot.traffic === "médio" ? 10 : 0;
}

function scoreLot(lot) {
  return Math.round(100 - lot.price * 1.4 - walkMinutes(lot) * 1.8 - driveMinutes(lot) * 0.18 - trafficPenalty(lot) + availability(lot) * 0.35 + lot.safety * 0.18);
}

function rankedLots() {
  const list = lots.slice();
  const sorters = {
    score: (a, b) => scoreLot(b) - scoreLot(a),
    price: (a, b) => a.price - b.price,
    distance: (a, b) => a.distance - b.distance,
    time: (a, b) => totalMinutes(a) - totalMinutes(b),
    availability: (a, b) => b.available - a.available,
  };
  return list.sort(sorters[state.sort] || sorters.score);
}

function wazeUrl(lot = selectedLot()) {
  return `https://waze.com/ul?ll=${lot.lat},${lot.lng}&navigate=yes`;
}

function mapsDriveUrl(lot = selectedLot()) {
  const start = originReady() ? `${origin().lat},${origin().lng}` : encodeURIComponent(origin().name);
  return `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${lot.lat},${lot.lng}&travelmode=driving`;
}

function mapsWalkUrl(lot = selectedLot()) {
  const dest = destination();
  return `https://www.google.com/maps/dir/?api=1&origin=${lot.lat},${lot.lng}&destination=${dest.lat},${dest.lng}&travelmode=walking`;
}

function trafficClass(value) {
  return value === "alto" ? "high" : value === "médio" ? "medium" : "low";
}

function mapPoint(point) {
  const x = ((point.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
  const y = ((mapBounds.north - point.lat) / (mapBounds.north - mapBounds.south)) * 100;
  return {
    x: Math.max(4, Math.min(96, x)),
    y: Math.max(4, Math.min(96, y)),
  };
}

function osmEmbedUrl() {
  const dest = destinationReady() ? destination() : destinations[0];
  const bbox = `${mapBounds.west},${mapBounds.south},${mapBounds.east},${mapBounds.north}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${dest.lat},${dest.lng}`;
}

function routeLineStyle() {
  const lot = mapPoint(selectedLot());
  const dest = mapPoint(destination());
  const dx = dest.x - lot.x;
  const dy = dest.y - lot.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return `left:${lot.x}%;top:${lot.y}%;width:${length}%;transform:rotate(${angle}deg);`;
}

function setTab(tab) {
  state.tab = tab;
  saveState();
  render();
}

function chooseLot(id, tab = "route") {
  state.selectedLotId = id;
  state.tab = tab;
  saveState();
  render();
}

function selectOptions(items, selected, labelKey = "name") {
  return items.map((item) => `<option value="${item.id || item}" ${item.id === selected || item === selected ? "selected" : ""}>${escapeText(item[labelKey] || item)}</option>`).join("");
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="app-shell" data-tab="${state.tab}">
      <aside class="panel">
        ${renderHeader()}
        ${renderControls()}
        ${renderTabs()}
        <section class="content">${renderTabContent()}</section>
      </aside>
      <section class="map-area">
        ${renderMap()}
        ${renderMapOverlay()}
      </section>
    </section>
  `;
}

function renderHeader() {
  const best = rankedLots()[0];
  return `
    <header class="brand-header">
      <div>
        <p>Parking Zero</p>
        <h1>Estacione melhor. Dirija menos.</h1>
      </div>
      <strong>${formatMinutes(totalMinutes(best))}</strong>
    </header>
  `;
}

function renderControls() {
  return `
    <section class="search-card">
      <label>
        <span>Onde você está?</span>
        <input list="origin-options" data-field="originText" value="${escapeText(state.originText)}" placeholder="Digite seu endereço, cidade ou país" />
        <datalist id="origin-options">
          ${originPresets.map((item) => `<option value="${escapeText(item.name)}"></option>`).join("")}
        </datalist>
      </label>
      <div class="origin-actions">
        <button type="button" data-action="resolve-origin">Atualizar origem</button>
        <button type="button" data-action="use-location">Minha localização</button>
      </div>
      ${state.originStatus ? `<p class="origin-status">${escapeText(state.originStatus)}</p>` : ""}
      <label>
        <span>Para onde você vai no Recife Antigo?</span>
        <input list="destination-options" data-field="destinationText" value="${escapeText(state.destinationText)}" placeholder="Ex.: Rua da Moeda, Marco Zero, Paço do Frevo" />
        <datalist id="destination-options">
          ${destinations.map((item) => `<option value="${escapeText(item.name)}"></option>`).join("")}
        </datalist>
      </label>
      <div class="origin-actions">
        <button type="button" data-action="resolve-destination">Atualizar destino</button>
        <button type="button" data-action="reset-destination">Marco Zero</button>
      </div>
      ${state.destinationStatus ? `<p class="origin-status">${escapeText(state.destinationStatus)}</p>` : ""}
      <label>
        <span>Horário</span>
        <select data-field="time">${selectOptions(times, state.time)}</select>
      </label>
      <div>
        <span class="field-title">Depois de estacionar</span>
        <div class="mode-grid">
          ${modes.map((mode) => `
            <button class="${mode.id === state.modeId ? "active" : ""}" type="button" data-mode="${mode.id}">
              <b>${mode.icon}</b><span>${mode.label}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTabs() {
  const tabs = [
    ["search", "Buscar"],
    ["compare", "Comparar"],
    ["route", "Rota"],
    ["reports", "Relatos"],
    ["saved", "Salvos"],
  ];
  return `
    <nav class="tabs">
      ${tabs.map(([id, label]) => `<button class="${state.tab === id ? "active" : ""}" type="button" data-tab="${id}">${label}</button>`).join("")}
    </nav>
  `;
}

function renderTabContent() {
  if (state.tab === "compare") return renderCompare();
  if (state.tab === "route") return renderRoute();
  if (state.tab === "reports") return renderReports();
  if (state.tab === "saved") return renderSaved();
  return renderSearch();
}

function renderSearch() {
  const best = rankedLots()[0];
  return `
    <div class="hero-decision">
      <span>Melhor escolha agora</span>
      <h2>${escapeText(best.name)}</h2>
      <p>${money(best.price)} · ${walkMinutes(best)} min ${selectedMode().label.toLowerCase()} · ${best.available} vagas</p>
      <small>Saindo de ${escapeText(origin().name)} até ${escapeText(destination().name)}</small>
      <div class="decision-actions">
        <button class="primary" type="button" data-lot-route="${best.id}">Ver rota</button>
        <a class="secondary" href="${wazeUrl(best)}" target="_blank" rel="noreferrer">Abrir Waze</a>
      </div>
    </div>
    <div class="quick-stats">
      <article><strong>${lots.length}</strong><span>opções</span></article>
      <article><strong>${money(Math.min(...lots.map((lot) => lot.price)))}</strong><span>menor preço</span></article>
      <article><strong>${formatDistance(distanceKm(origin(), best))}</strong><span>até estacionar</span></article>
    </div>
    <div class="section-title">
      <h2>Estacionamentos próximos</h2>
      <button type="button" data-tab="compare">Comparar todos</button>
    </div>
    <div class="lot-list">${rankedLots().slice(0, 4).map(renderLotCard).join("")}</div>
  `;
}

function renderCompare() {
  return `
    <div class="sort-row">
      ${[
        ["score", "Melhor"],
        ["price", "Preço"],
        ["distance", "Distância"],
        ["time", "Tempo"],
        ["availability", "Vagas"],
      ].map(([id, label]) => `<button class="${state.sort === id ? "active" : ""}" type="button" data-sort="${id}">${label}</button>`).join("")}
    </div>
    <div class="lot-list">${rankedLots().map(renderLotCard).join("")}</div>
  `;
}

function renderLotCard(lot) {
  const selected = lot.id === state.selectedLotId;
  return `
    <article class="lot-card ${selected ? "selected" : ""}">
      <button class="lot-main" type="button" data-lot-route="${lot.id}">
        <div class="pin ${trafficClass(lot.traffic)}">P</div>
        <div>
          <h3>${escapeText(lot.name)}</h3>
          <p>${money(lot.price)} · ${formatMinutes(driveMinutes(lot))} de carro · ${walkMinutes(lot)} min ${selectedMode().label.toLowerCase()}</p>
          <p>${lot.available}/${lot.total} vagas · ${formatDistance(distanceKm(origin(), lot))} da origem</p>
          <small>${lot.tags.map(escapeText).join(" · ")}</small>
        </div>
        <strong>${scoreLot(lot)}</strong>
      </button>
      <div class="lot-actions">
        <button type="button" data-favorite="${lot.id}">${state.favorites.includes(lot.id) ? "Salvo" : "Salvar"}</button>
        <a href="${wazeUrl(lot)}" target="_blank" rel="noreferrer">Waze</a>
        <a href="${mapsDriveUrl(lot)}" target="_blank" rel="noreferrer">Maps</a>
      </div>
    </article>
  `;
}

function renderRoute() {
  const lot = selectedLot();
  const mode = selectedMode();
  return `
    <section class="route-summary">
      <div class="route-head">
        <span class="pin ${trafficClass(lot.traffic)}">P</span>
        <div>
          <h2>${escapeText(lot.name)}</h2>
          <p>Origem: ${escapeText(origin().name)}</p>
          <p>Destino: ${escapeText(destination().name)} · ${escapeText(state.time)}</p>
        </div>
      </div>
      <div class="route-grid">
        <article><span>Origem até vaga</span><strong>${formatMinutes(driveMinutes(lot))}</strong><small>${formatDistance(distanceKm(origin(), lot))} · trânsito ${lot.traffic}</small></article>
        <article><span>${mode.label} final</span><strong>${walkMinutes(lot)} min</strong><small>${Math.round(walkDistance(lot))} m · ${mode.cost}</small></article>
        <article><span>Total estimado</span><strong>${formatMinutes(totalMinutes(lot))}</strong><small>${money(lot.price)}</small></article>
      </div>
      <div class="decision-actions">
        <a class="primary" href="${wazeUrl(lot)}" target="_blank" rel="noreferrer" data-save-route="${lot.id}">Ir pelo Waze</a>
        <a class="secondary" href="${mapsDriveUrl(lot)}" target="_blank" rel="noreferrer">Origem até vaga</a>
        <a class="secondary" href="${mapsWalkUrl(lot)}" target="_blank" rel="noreferrer">Vaga até destino</a>
      </div>
      <button class="save-route" type="button" data-save-route="${lot.id}">Salvar rota no histórico</button>
    </section>
    ${renderModalChoices()}
  `;
}

function renderModalChoices() {
  const lot = selectedLot();
  return `
    <section class="modal-choice-list">
      <h2>Troca modal depois do carro</h2>
      ${modes.map((mode) => `
        <button class="${mode.id === state.modeId ? "active" : ""}" type="button" data-mode="${mode.id}">
          <span>${mode.icon}</span>
          <b>${mode.label}</b>
          <em>${walkMinutes(lot, mode)} min</em>
          <small>${mode.cost}</small>
        </button>
      `).join("")}
    </section>
  `;
}

function renderReports() {
  const types = ["Todos", "Trânsito", "Vagas", "Preço", "Rua"];
  const visible = state.reportFilter === "Todos" ? state.reports : state.reports.filter((report) => report.type === state.reportFilter);
  return `
    <div class="sort-row">
      ${types.map((type) => `<button class="${state.reportFilter === type ? "active" : ""}" type="button" data-report-filter="${type}">${type}</button>`).join("")}
    </div>
    <form class="report-form" id="report-form">
      <select name="type">${types.filter((type) => type !== "Todos").map((type) => `<option>${type}</option>`).join("")}</select>
      <input name="title" placeholder="Ex.: vagas acabando no Paço" required />
      <button type="submit">Enviar</button>
    </form>
    <div class="report-list">${visible.map((report) => `
      <article class="report ${report.severity}">
        <span>${escapeText(report.type)}</span>
        <h3>${escapeText(report.title)}</h3>
        <p>${escapeText(report.place)} · ${report.minutes} min atrás</p>
      </article>
    `).join("")}</div>
  `;
}

function renderSaved() {
  const favoriteLots = lots.filter((lot) => state.favorites.includes(lot.id));
  return `
    <div class="section-title">
      <h2>Favoritos</h2>
      <button type="button" data-favorite="${selectedLot().id}">Salvar atual</button>
    </div>
    <div class="lot-list">
      ${favoriteLots.length ? favoriteLots.map(renderLotCard).join("") : `<p class="empty">Nenhum estacionamento salvo ainda.</p>`}
    </div>
    <div class="section-title"><h2>Histórico</h2></div>
    <div class="history-list">
      ${state.history.length ? state.history.map((item) => `
        <article>
          <strong>${escapeText(item.lot)}</strong>
          <p>${escapeText(item.origin || "Origem")} → ${escapeText(item.destination)} · ${formatMinutes(item.minutes)} · ${escapeText(item.time)}</p>
        </article>
      `).join("") : `<p class="empty">Salve uma rota para criar histórico.</p>`}
    </div>
  `;
}

function renderMapOverlay() {
  const lot = selectedLot();
  return `
    <div class="map-card">
      <span class="status ${trafficClass(lot.traffic)}">${lot.traffic === "alto" ? "Crítico" : lot.traffic === "médio" ? "Atenção" : "Fluido"}</span>
      <h2>${escapeText(lot.name)}</h2>
      <p>${lot.available} vagas · ${money(lot.price)} · ${formatMinutes(totalMinutes(lot))} total</p>
      <small>${formatDistance(distanceKm(origin(), lot))} da sua origem · ${Math.round(walkDistance(lot))} m até o destino</small>
      <div class="map-actions">
        <button type="button" data-lot-route="${lot.id}">Rota</button>
        <button type="button" data-tab="reports">Relatos</button>
      </div>
    </div>
  `;
}

function renderMap() {
  const destPoint = mapPoint(destination());
  return `
    <iframe
      class="real-map-frame"
      title="Mapa real do Recife Antigo"
      src="${osmEmbedUrl()}"
      loading="eager"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <div class="map-overlay-layer" aria-label="Estacionamentos no mapa">
      <div class="route-line-real" style="${routeLineStyle()}"></div>
      <div class="dest-pin" style="left:${destPoint.x}%;top:${destPoint.y}%;">Destino</div>
      ${lots.map((lot) => {
        const point = mapPoint(lot);
        const selected = lot.id === state.selectedLotId ? "selected" : "";
        return `<button class="map-parking-pin ${trafficClass(lot.traffic)} ${selected}" style="left:${point.x}%;top:${point.y}%;" type="button" data-lot-route="${lot.id}" aria-label="${escapeText(lot.name)}">P</button>`;
      }).join("")}
    </div>
  `;
}

function applyPresetOrigin() {
  const typed = normalizeText(state.originText);
  const preset = originPresets.find((item) => normalizeText(item.name) === typed);
  if (!preset) return false;
  state.originText = preset.name;
  state.originLat = preset.lat;
  state.originLng = preset.lng;
  state.originStatus = `Origem definida: ${preset.name}`;
  return true;
}

function applyPresetDestination() {
  const typed = normalizeText(state.destinationText);
  const preset = destinations.find((item) => normalizeText(item.name) === typed);
  if (!preset) return false;
  state.destinationId = preset.id;
  state.destinationText = preset.name;
  state.destinationLat = preset.lat;
  state.destinationLng = preset.lng;
  state.destinationStatus = `Destino definido: ${preset.name}`;
  return true;
}

async function resolveOrigin() {
  const originInput = document.querySelector("[data-field=originText]");
  if (originInput) state.originText = originInput.value;
  if (applyPresetOrigin()) {
    saveState();
    render();
    return;
  }
  const query = state.originText.trim();
  if (!query) {
    state.originStatus = "Digite uma origem primeiro.";
    render();
    return;
  }
  state.originStatus = "Buscando origem...";
  render();
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const results = await response.json();
    if (!results.length) {
      state.originStatus = "Não encontrei esse endereço. Tente colocar cidade/estado também.";
      render();
      return;
    }
    state.originLat = Number(results[0].lat);
    state.originLng = Number(results[0].lon);
    state.originText = results[0].display_name.split(",").slice(0, 3).join(",");
    state.originStatus = `Origem definida: ${state.originText}`;
    saveState();
    render();
  } catch (error) {
    state.originStatus = "Não consegui consultar o endereço agora. Use um preset ou tente de novo.";
    render();
  }
}

async function resolveDestination() {
  const destinationInput = document.querySelector("[data-field=destinationText]");
  if (destinationInput) state.destinationText = destinationInput.value;
  if (applyPresetDestination()) {
    saveState();
    render();
    return;
  }
  const query = state.destinationText.trim();
  if (!query) {
    state.destinationStatus = "Digite para onde você vai.";
    render();
    return;
  }
  state.destinationStatus = "Buscando destino no Recife Antigo...";
  render();
  try {
    const shouldBiasRecife = !/(recife|pernambuco|\bpe\b|brasil|brazil)/i.test(query);
    const queryText = shouldBiasRecife ? `${query}, Recife Antigo, Recife, PE, Brasil` : query;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(queryText)}`;
    const response = await fetch(url);
    const results = await response.json();
    if (!results.length) {
      state.destinationStatus = "Não encontrei esse destino. Tente rua, ponto turístico ou bairro.";
      render();
      return;
    }
    state.destinationLat = Number(results[0].lat);
    state.destinationLng = Number(results[0].lon);
    state.destinationText = results[0].display_name.split(",").slice(0, 3).join(",");
    state.destinationStatus = `Destino definido: ${state.destinationText}`;
    saveState();
    render();
  } catch (error) {
    state.destinationStatus = "Não consegui consultar o destino agora. Use uma sugestão ou tente de novo.";
    render();
  }
}

function resetDestination() {
  const marco = destinations[0];
  state.destinationId = marco.id;
  state.destinationText = marco.name;
  state.destinationLat = marco.lat;
  state.destinationLng = marco.lng;
  state.destinationStatus = `Destino definido: ${marco.name}`;
  saveState();
  render();
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    state.originStatus = "Seu navegador não liberou localização.";
    render();
    return;
  }
  state.originStatus = "Pedindo sua localização...";
  render();
  navigator.geolocation.getCurrentPosition((position) => {
    state.originLat = position.coords.latitude;
    state.originLng = position.coords.longitude;
    state.originText = "Minha localização atual";
    state.originStatus = "Origem definida pela sua localização.";
    saveState();
    render();
  }, () => {
    state.originStatus = "Localização negada. Digite seu endereço manualmente.";
    render();
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
  });
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action) {
    if (action.dataset.action === "resolve-origin") {
      resolveOrigin();
      return;
    }
    if (action.dataset.action === "use-location") {
      useCurrentLocation();
      return;
    }
    if (action.dataset.action === "resolve-destination") {
      resolveDestination();
      return;
    }
    if (action.dataset.action === "reset-destination") {
      resetDestination();
      return;
    }
  }

  const tab = event.target.closest("button[data-tab]");
  if (tab) {
    setTab(tab.dataset.tab);
    return;
  }

  const lotRoute = event.target.closest("[data-lot-route]");
  if (lotRoute) {
    chooseLot(lotRoute.dataset.lotRoute);
    return;
  }

  const popupLot = event.target.closest("[data-popup-lot]");
  if (popupLot) {
    chooseLot(popupLot.dataset.popupLot);
    return;
  }

  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    const id = favorite.dataset.favorite;
    state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : state.favorites.concat(id);
    saveState();
    render();
    return;
  }

  const sort = event.target.closest("[data-sort]");
  if (sort) {
    state.sort = sort.dataset.sort;
    saveState();
    render();
    return;
  }

  const mode = event.target.closest("[data-mode]");
  if (mode) {
    state.modeId = mode.dataset.mode;
    saveState();
    render();
    return;
  }

  const reportFilter = event.target.closest("[data-report-filter]");
  if (reportFilter) {
    state.reportFilter = reportFilter.dataset.reportFilter;
    render();
    return;
  }

  const saveRoute = event.target.closest("[data-save-route]");
  if (saveRoute) {
    const lot = lots.find((item) => item.id === saveRoute.dataset.saveRoute) || selectedLot();
    state.history = [{
      lot: lot.name,
      destination: destination().name,
      minutes: totalMinutes(lot),
      time: state.time,
      origin: origin().name,
    }].concat(state.history).slice(0, 8);
    if (!state.favorites.includes(lot.id)) state.favorites.push(lot.id);
    saveState();
  }
});

document.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  state[field] = event.target.value;
  if (field === "originText") {
    state.originStatus = "";
    applyPresetOrigin();
  }
  if (field === "destinationText") {
    state.destinationStatus = "";
    applyPresetDestination();
  }
  saveState();
  render();
});

document.addEventListener("submit", (event) => {
  if (!event.target.matches("#report-form")) return;
  event.preventDefault();
  const form = event.target;
  const type = form.elements.type.value;
  state.reports = [{
    id: Date.now(),
    type,
    title: form.elements.title.value,
    place: destination().name,
    minutes: 0,
    severity: type === "Trânsito" ? "danger" : type === "Vagas" ? "good" : type === "Preço" ? "info" : "warn",
  }].concat(state.reports).slice(0, 12);
  state.reportFilter = "Todos";
  saveState();
  render();
});

render();
