const STORAGE_KEY = "parking-zero-app-v2";

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

let map;
let markers = [];
let routeLayer;

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
  return destinations.find((item) => item.id === state.destinationId) || destinations[0];
}

function selectedLot() {
  return lots.find((item) => item.id === state.selectedLotId) || lots[0];
}

function selectedMode() {
  return modes.find((item) => item.id === state.modeId) || modes[0];
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

function walkMinutes(lot, mode = selectedMode()) {
  return Math.max(3, Math.round((lot.distance / 75) * mode.pace));
}

function totalMinutes(lot, mode = selectedMode()) {
  return lot.drive + walkMinutes(lot, mode);
}

function availability(lot) {
  return Math.round((lot.available / lot.total) * 100);
}

function trafficPenalty(lot) {
  return lot.traffic === "alto" ? 22 : lot.traffic === "médio" ? 10 : 0;
}

function scoreLot(lot) {
  return Math.round(100 - lot.price * 1.4 - walkMinutes(lot) * 1.8 - trafficPenalty(lot) + availability(lot) * 0.35 + lot.safety * 0.18);
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

function mapsUrl(lot = selectedLot()) {
  const dest = destination();
  return `https://www.google.com/maps/dir/?api=1&origin=${lot.lat},${lot.lng}&destination=${dest.lat},${dest.lng}&travelmode=walking`;
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
    <section class="app-shell">
      <aside class="panel">
        ${renderHeader()}
        ${renderControls()}
        ${renderTabs()}
        <section class="content">${renderTabContent()}</section>
      </aside>
      <section class="map-area">
        <div id="real-map" class="real-map"></div>
        ${renderMapOverlay()}
      </section>
    </section>
  `;
  initMap();
}

function renderHeader() {
  const best = rankedLots()[0];
  return `
    <header class="brand-header">
      <div>
        <p>Parking Zero</p>
        <h1>Estacione melhor. Dirija menos.</h1>
      </div>
      <strong>${totalMinutes(best)} min</strong>
    </header>
  `;
}

function renderControls() {
  return `
    <section class="search-card">
      <label>
        <span>Destino</span>
        <select data-field="destinationId">${selectOptions(destinations, state.destinationId)}</select>
      </label>
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
      <div class="decision-actions">
        <button class="primary" type="button" data-lot-route="${best.id}">Ver rota</button>
        <a class="secondary" href="${wazeUrl(best)}" target="_blank" rel="noreferrer">Abrir Waze</a>
      </div>
    </div>
    <div class="quick-stats">
      <article><strong>${lots.length}</strong><span>opções</span></article>
      <article><strong>${money(Math.min(...lots.map((lot) => lot.price)))}</strong><span>menor preço</span></article>
      <article><strong>${reportsSeed.length}</strong><span>alertas ativos</span></article>
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
        <div class="pin ${lot.traffic}">P</div>
        <div>
          <h3>${escapeText(lot.name)}</h3>
          <p>${money(lot.price)} · ${walkMinutes(lot)} min ${selectedMode().label.toLowerCase()} · ${lot.available}/${lot.total} vagas</p>
          <small>${lot.tags.map(escapeText).join(" · ")}</small>
        </div>
        <strong>${scoreLot(lot)}</strong>
      </button>
      <div class="lot-actions">
        <button type="button" data-favorite="${lot.id}">${state.favorites.includes(lot.id) ? "Salvo" : "Salvar"}</button>
        <a href="${wazeUrl(lot)}" target="_blank" rel="noreferrer">Waze</a>
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
        <span class="pin ${lot.traffic}">P</span>
        <div>
          <h2>${escapeText(lot.name)}</h2>
          <p>Destino: ${escapeText(destination().name)} · ${escapeText(state.time)}</p>
        </div>
      </div>
      <div class="route-grid">
        <article><span>Até estacionar</span><strong>${lot.drive} min</strong><small>trânsito ${lot.traffic}</small></article>
        <article><span>${mode.label} final</span><strong>${walkMinutes(lot)} min</strong><small>${mode.cost}</small></article>
        <article><span>Total estimado</span><strong>${totalMinutes(lot)} min</strong><small>${money(lot.price)}</small></article>
      </div>
      <div class="decision-actions">
        <a class="primary" href="${wazeUrl(lot)}" target="_blank" rel="noreferrer" data-save-route="${lot.id}">Ir pelo Waze</a>
        <a class="secondary" href="${mapsUrl(lot)}" target="_blank" rel="noreferrer">Trecho final no Maps</a>
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
          <p>${escapeText(item.destination)} · ${item.minutes} min · ${escapeText(item.time)}</p>
        </article>
      `).join("") : `<p class="empty">Salve uma rota para criar histórico.</p>`}
    </div>
  `;
}

function renderMapOverlay() {
  const lot = selectedLot();
  return `
    <div class="map-card">
      <span class="status ${lot.traffic}">${lot.traffic === "alto" ? "Crítico" : lot.traffic === "médio" ? "Atenção" : "Fluido"}</span>
      <h2>${escapeText(lot.name)}</h2>
      <p>${lot.available} vagas · ${money(lot.price)} · ${totalMinutes(lot)} min total</p>
      <div class="map-actions">
        <button type="button" data-lot-route="${lot.id}">Rota</button>
        <button type="button" data-tab="reports">Relatos</button>
      </div>
    </div>
  `;
}

function initMap() {
  const mapEl = document.getElementById("real-map");
  if (!mapEl || !window.L) {
    mapEl.innerHTML = `<div class="map-fallback">Mapa real indisponível agora. Use o botão Waze para navegar.</div>`;
    return;
  }
  if (map) map.remove();
  markers = [];
  const dest = destination();
  map = L.map(mapEl, { zoomControl: false }).setView([dest.lat, dest.lng], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.circleMarker([dest.lat, dest.lng], {
    radius: 9,
    color: "#111827",
    fillColor: "#facc15",
    fillOpacity: 1,
    weight: 2,
  }).addTo(map).bindPopup(`Destino: ${dest.name}`);

  lots.forEach((lot) => {
    const marker = L.marker([lot.lat, lot.lng], { title: lot.name }).addTo(map);
    marker.bindPopup(`<strong>${lot.name}</strong><br>${money(lot.price)} · ${lot.available} vagas<br><button data-popup-lot="${lot.id}">Escolher</button>`);
    marker.on("click", () => {
      state.selectedLotId = lot.id;
      saveState();
      drawRoute();
    });
    markers.push(marker);
  });
  drawRoute();
  setTimeout(() => map.invalidateSize(), 80);
}

function drawRoute() {
  if (!map || !window.L) return;
  const lot = selectedLot();
  const dest = destination();
  if (routeLayer) routeLayer.remove();
  routeLayer = L.polyline([[lot.lat, lot.lng], [dest.lat, dest.lng]], {
    color: "#2563eb",
    weight: 4,
    opacity: 0.85,
  }).addTo(map);
  const bounds = L.latLngBounds([[lot.lat, lot.lng], [dest.lat, dest.lng]]);
  map.fitBounds(bounds.pad(0.35));
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
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
    }].concat(state.history).slice(0, 8);
    if (!state.favorites.includes(lot.id)) state.favorites.push(lot.id);
    saveState();
  }
});

document.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  state[field] = event.target.value;
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
