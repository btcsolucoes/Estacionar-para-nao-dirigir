const destinations = [
  { id: "marco-zero", name: "Marco Zero", area: "Praça Rio Branco", load: 5, anchor: 5 },
  { id: "paco-frevo", name: "Paço do Frevo", area: "Rua da Guia", load: 4, anchor: 4 },
  { id: "rua-moeda", name: "Rua da Moeda", area: "Polo noturno", load: 5, anchor: 6 },
  { id: "cais-sertao", name: "Cais do Sertão", area: "Armazéns do Porto", load: 3, anchor: 7 },
  { id: "arsenal", name: "Praça do Arsenal", area: "Bairro do Recife", load: 4, anchor: 3 },
  { id: "porto-digital", name: "Porto Digital", area: "Rua do Apolo", load: 3, anchor: 2 },
  { id: "teatro-apolo", name: "Teatro Apolo", area: "Rua do Recife", load: 4, anchor: 4 },
  { id: "embaixada", name: "Embaixada dos Bonecos", area: "Rua do Bom Jesus", load: 4, anchor: 5 },
  { id: "terminal", name: "Terminal Marítimo", area: "Porto do Recife", load: 2, anchor: 8 },
  { id: "alfandega", name: "Shopping Paço Alfândega", area: "Madre de Deus", load: 3, anchor: 5 },
];

const timeSlots = [
  { value: "07:00", label: "07:00", tag: "manhã leve", pressure: 1, price: 0 },
  { value: "08:00", label: "08:00", tag: "entrada", pressure: 2, price: 2 },
  { value: "09:00", label: "09:00", tag: "entrada", pressure: 2, price: 2 },
  { value: "10:00", label: "10:00", tag: "calmo", pressure: 0, price: 0 },
  { value: "12:00", label: "12:00", tag: "almoco", pressure: 1, price: 1 },
  { value: "14:00", label: "14:00", tag: "calmo", pressure: 0, price: 0 },
  { value: "16:00", label: "16:00", tag: "pré-pico", pressure: 2, price: 2 },
  { value: "17:00", label: "17:00", tag: "pico", pressure: 3, price: 4 },
  { value: "18:00", label: "18:00", tag: "pico", pressure: 4, price: 5 },
  { value: "19:00", label: "19:00", tag: "evento", pressure: 4, price: 6 },
  { value: "20:00", label: "20:00", tag: "evento", pressure: 3, price: 5 },
  { value: "21:00", label: "21:00", tag: "noite", pressure: 2, price: 3 },
  { value: "22:00", label: "22:00", tag: "noite", pressure: 2, price: 2 },
  { value: "23:00", label: "23:00", tag: "saída", pressure: 3, price: 2 },
];

const modes = [
  { id: "walk", name: "A pé", short: "Pé", minutes: 0, cost: 0, note: "grátis, evita fila e é melhor para até 900 m" },
  { id: "bike", name: "Bike", short: "Bk", minutes: -2, cost: 0, note: "bom quando a caminhada passa de 900 m" },
  { id: "uber", name: "Uber", short: "Ub", minutes: 2, cost: 14, note: "melhor para noite ou chuva" },
  { id: "shuttle", name: "Shuttle", short: "Sh", minutes: 4, cost: 4, note: "circular para grandes eventos" },
  { id: "bus", name: "Ônibus", short: "On", minutes: 8, cost: 4.3, note: "barato, mas depende de intervalo" },
];

const parkingLots = [
  { id: "paco", name: "Estac. Paço Alfândega", address: "Rua Madre de Deus", zone: "Centro", hourly: 18, event: 45, daily: 72, baseAvailability: 70, baseDrive: 10, baseWalk: 4, driveKm: 4.2, anchor: 5, traffic: "medio", note: "mais perto dos polos históricos" },
  { id: "alfredo", name: "Garagem Alfredo Lisboa", address: "Av. Alfredo Lisboa", zone: "Porto", hourly: 20, event: 52, daily: 86, baseAvailability: 42, baseDrive: 13, baseWalk: 7, driveKm: 4.9, anchor: 6, traffic: "alto", note: "perto, mas sofre nos horários de evento" },
  { id: "apolo", name: "Garagem Cais do Apolo", address: "Cais do Apolo, 222", zone: "Apolo", hourly: 15, event: 38, daily: 65, baseAvailability: 66, baseDrive: 12, baseWalk: 8, driveKm: 4.6, anchor: 2, traffic: "medio", note: "equilíbrio bom entre preço e acesso" },
  { id: "riomar", name: "Estac. RioMar Recife", address: "Av. República do Líbano", zone: "Fora do miolo", hourly: 12, event: 35, daily: 58, baseAvailability: 84, baseDrive: 18, baseWalk: 15, driveKm: 6.8, anchor: 0, traffic: "baixo", note: "bom para deixar o carro fora do centro crítico" },
  { id: "santo", name: "Ed. Garagem Santo Antonio", address: "Rua do Carmo", zone: "Santo Antonio", hourly: 10, event: 32, daily: 48, baseAvailability: 74, baseDrive: 16, baseWalk: 12, driveKm: 5.1, anchor: 1, traffic: "baixo", note: "barato, com trecho final maior" },
  { id: "portuaria", name: "Zona Portuária", address: "Cais do Porto", zone: "Borda norte", hourly: 14, event: 36, daily: 60, baseAvailability: 78, baseDrive: 15, baseWalk: 10, driveKm: 5.7, anchor: 8, traffic: "baixo", note: "boa para eventos nos armazéns" },
  { id: "bom-jesus", name: "Pátio Bom Jesus", address: "Rua do Bom Jesus", zone: "Histórico", hourly: 22, event: 58, daily: 92, baseAvailability: 35, baseDrive: 15, baseWalk: 5, driveKm: 4.5, anchor: 5, traffic: "alto", note: "conveniente, caro e disputado" },
  { id: "capibaribe", name: "Bolso Capibaribe", address: "Rua da Aurora", zone: "Borda oeste", hourly: 9, event: 28, daily: 44, baseAvailability: 80, baseDrive: 17, baseWalk: 13, driveKm: 5.9, anchor: 2, traffic: "baixo", note: "menor preço para quem aceita caminhar mais" },
  { id: "terminal", name: "Terminal Marítimo", address: "Av. Alfredo Lisboa, porto", zone: "Terminal", hourly: 16, event: 42, daily: 70, baseAvailability: 62, baseDrive: 14, baseWalk: 9, driveKm: 4.8, anchor: 8, traffic: "medio", note: "funciona bem para Cais do Sertão e Terminal" },
];

const baseReports = [
  { type: "Trânsito", place: "Rua do Bom Jesus", detail: "fluxo intenso perto dos bares", minutes: 8 },
  { type: "Vagas", place: "Paço Alfândega", detail: "poucas vagas cobertas", minutes: 14 },
  { type: "Rua", place: "Rua da Moeda", detail: "trecho com bloqueio parcial", minutes: 23 },
  { type: "Preço", place: "Garagem Alfredo Lisboa", detail: "pacote de evento acima da média", minutes: 31 },
];

const criticalAreas = [
  { name: "Rua do Bom Jesus", reason: "alto fluxo de pedestres e bares", level: "alto" },
  { name: "Rua da Moeda", reason: "bloqueios parciais em eventos", level: "medio" },
  { name: "Madre de Deus", reason: "procura alta por vagas cobertas", level: "alto" },
];

const strategicRegions = [
  { name: "Zona Portuária", reason: "pouco movimento e boa caminhada para o Cais", walk: "10 min" },
  { name: "Santo Antônio", reason: "preço menor e acesso por ponte", walk: "12 min" },
  { name: "Borda Capibaribe", reason: "saída mais simples no fim do evento", walk: "13 min" },
];

const viewTitles = {
  plan: "Planejar estacionamento",
  compare: "Comparar opções",
  route: "Resumo da rota",
  map: "Mapa e relatos",
  saved: "Histórico e favoritos",
};

const elements = {
  main: document.getElementById("main-view"),
  context: document.getElementById("context-view"),
  title: document.getElementById("view-title"),
  nav: document.querySelector(".bottom-nav"),
  reset: document.getElementById("reset-button"),
};

const store = readStore();
const state = {
  view: "plan",
  destinationId: "marco-zero",
  time: "20:00",
  modeId: "walk",
  selectedLotId: "paco",
  sort: "score",
  filter: "all",
  favorites: store.favorites,
  history: store.history,
  reports: store.reports,
};

function readStore() {
  try {
    const saved = JSON.parse(localStorage.getItem("parking-zero-store") || "{}");
    return {
      favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
      history: Array.isArray(saved.history) ? saved.history : [],
      reports: Array.isArray(saved.reports) ? saved.reports : baseReports,
    };
  } catch (error) {
    return { favorites: [], history: [], reports: baseReports };
  }
}

function saveStore() {
  localStorage.setItem(
    "parking-zero-store",
    JSON.stringify({
      favorites: state.favorites,
      history: state.history.slice(0, 10),
      reports: state.reports.slice(0, 12),
    }),
  );
}

function byId(list, id) {
  return list.find(function (item) {
    return item.id === id || item.value === id;
  }) || list[0];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function money(value) {
  return "R$ " + value.toFixed(value % 1 === 0 ? 0 : 2).replace(".", ",");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function scenario() {
  const destination = byId(destinations, state.destinationId);
  const slot = byId(timeSlots, state.time);
  const pressure = clamp(destination.load + slot.pressure, 1, 10);
  return { destination: destination, slot: slot, pressure: pressure };
}

function enrichedLots() {
  const data = scenario();
  const mode = byId(modes, state.modeId);
  return parkingLots.map(function (lot) {
    const distancePenalty = Math.abs(lot.anchor - data.destination.anchor);
    const trafficPenalty = lot.traffic === "alto" ? 7 : lot.traffic === "medio" ? 4 : 1;
    const availability = clamp(
      lot.baseAvailability - data.pressure * 5 - distancePenalty * 3 - (lot.traffic === "alto" ? 7 : 0),
      6,
      96,
    );
    const walk = clamp(lot.baseWalk + distancePenalty * 2 + Math.round(data.destination.load / 2), 3, 24);
    const drive = clamp(lot.baseDrive + data.pressure * 2 + trafficPenalty, 8, 42);
    const finalLeg = Math.max(3, walk + mode.minutes);
    const eventPrice = lot.event + data.slot.price;
    const score = clamp(
      Math.round(112 - eventPrice * 0.55 - drive * 0.6 - finalLeg + availability * 0.65),
      12,
      98,
    );
    return Object.assign({}, lot, {
      availability: Math.round(availability),
      occupancy: 100 - Math.round(availability),
      walk: finalLeg,
      walkRaw: walk,
      drive: drive,
      total: drive + finalLeg,
      eventPrice: eventPrice,
      modalCost: mode.cost,
      totalCost: eventPrice + mode.cost,
      score: score,
      distancePenalty: distancePenalty,
    });
  });
}

function orderedLots() {
  let list = enrichedLots();
  if (state.filter === "cheap") {
    list = list.filter(function (lot) {
      return lot.eventPrice <= 38;
    });
  }
  if (state.filter === "available") {
    list = list.filter(function (lot) {
      return lot.availability >= 55;
    });
  }
  if (state.filter === "near") {
    list = list.filter(function (lot) {
      return lot.walkRaw <= 10;
    });
  }
  list.sort(function (a, b) {
    if (state.sort === "price") return a.eventPrice - b.eventPrice;
    if (state.sort === "walk") return a.walk - b.walk;
    if (state.sort === "availability") return b.availability - a.availability;
    if (state.sort === "drive") return a.drive - b.drive;
    return b.score - a.score;
  });
  return list;
}

function selectedLot() {
  const list = enrichedLots();
  return byId(list, state.selectedLotId);
}

function recommendedLot() {
  return orderedLots()[0] || enrichedLots()[0];
}

function statusClass(value) {
  if (value >= 60) return "status-good";
  if (value >= 32) return "status-warn";
  return "status-bad";
}

function setView(view) {
  state.view = view;
  render();
}

function setSelectedLot(id) {
  state.selectedLotId = id;
  const lot = selectedLot();
  const data = scenario();
  state.history = [
    {
      id: Date.now(),
      lotId: lot.id,
      lotName: lot.name,
      destination: data.destination.name,
      time: state.time,
      price: lot.totalCost,
      total: lot.total,
    },
  ].concat(state.history.filter(function (item) {
    return item.lotId !== lot.id || item.destination !== data.destination.name;
  })).slice(0, 10);
  saveStore();
}

function toggleFavorite(id) {
  if (state.favorites.indexOf(id) >= 0) {
    state.favorites = state.favorites.filter(function (favorite) {
      return favorite !== id;
    });
  } else {
    state.favorites = [id].concat(state.favorites).slice(0, 12);
  }
  saveStore();
}

function render() {
  const best = recommendedLot();
  if (!state.selectedLotId) state.selectedLotId = best.id;
  elements.title.textContent = viewTitles[state.view];
  document.querySelectorAll(".nav-item").forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  if (state.view === "compare") renderCompare();
  if (state.view === "route") renderRoute();
  if (state.view === "map") renderMap();
  if (state.view === "saved") renderSaved();
  if (state.view === "plan") renderPlan();
  renderContext();
}

function renderPlan() {
  const data = scenario();
  const best = recommendedLot();
  elements.main.innerHTML = `
    <section class="section planner-section">
      <div class="section-header">
        <div>
          <h3>Escolha destino, horário e deslocamento final</h3>
          <p>O protótipo recalcula preço, vagas, congestionamento e tempo total.</p>
        </div>
      </div>
      <form class="planner-form" id="planner-form">
        <label class="field">
          <span>Destino</span>
          <select name="destination">
            ${destinations.map(function (item) {
              return `<option value="${item.id}" ${item.id === state.destinationId ? "selected" : ""}>${item.name} - ${item.area}</option>`;
            }).join("")}
          </select>
        </label>
        <label class="field">
          <span>Horário de chegada</span>
          <select name="time">
            ${timeSlots.map(function (slot) {
              return `<option value="${slot.value}" ${slot.value === state.time ? "selected" : ""}>${slot.label} - ${slot.tag}</option>`;
            }).join("")}
          </select>
        </label>
        <div class="field">
          <span>Depois de estacionar</span>
          <div class="mode-grid">
            ${modes.map(function (mode) {
              return `<button class="mode-button ${mode.id === state.modeId ? "is-selected" : ""}" type="button" data-mode="${mode.id}">
                <span>${mode.short}</span>${mode.name}
              </button>`;
            }).join("")}
          </div>
        </div>
      </form>
    </section>

    <section class="section">
      <div class="decision-card">
        <div>
          <span class="pill">Melhor escolha agora</span>
          <h3>${best.name}</h3>
          <p>${best.note}. Para ${data.destination.name} às ${state.time}, entrega o melhor equilíbrio entre custo, disponibilidade e tempo.</p>
        </div>
        <div class="score-box">
          <strong>${best.score}</strong>
          <span>score</span>
        </div>
      </div>
      <div class="metric-grid">
        ${metric("Preço pacote", money(best.eventPrice), "hora " + money(best.hourly) + " / diária " + money(best.daily))}
        ${metric("Tempo total", best.total + " min", best.drive + " min carro + " + best.walk + " min final")}
        ${metric("Vagas prováveis", best.availability + "%", best.occupancy + "% de ocupação")}
        ${metric("Destino", data.destination.name, data.destination.area)}
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" data-action="accept-best" data-id="${best.id}">Usar esta opção</button>
        <button class="secondary-button" type="button" data-view="compare">Ver todos os preços</button>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Opções rápidas</h3>
          <p>Mais horários, destinos e preços em um resumo único.</p>
        </div>
      </div>
      <div class="quick-grid">
        ${orderedLots().slice(0, 4).map(compactLotCard).join("")}
      </div>
    </section>
  `;
}

function metric(label, value, hint) {
  return `<div class="metric-card"><span>${label}</span><strong>${value}</strong><p>${hint}</p></div>`;
}

function compactLotCard(lot) {
  return `
    <article class="compact-lot">
      <div>
        <h4>${lot.name}</h4>
        <p>${lot.zone} - ${lot.note}</p>
      </div>
      <strong>${money(lot.eventPrice)}</strong>
      <span>${lot.total} min total</span>
      <button class="text-button" type="button" data-select-lot="${lot.id}" data-next-view="route">Selecionar</button>
    </article>
  `;
}

function renderCompare() {
  const lots = orderedLots();
  elements.main.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Compare por preço, vagas, distância e trânsito</h3>
          <p>Use os filtros para ver a opção mais barata, mais perto ou com menor risco de lotação.</p>
        </div>
      </div>
      <div class="toolbar">
        ${chip("score", "Melhor score", "sort")}
        ${chip("price", "Menor preço", "sort")}
        ${chip("walk", "Menor caminhada", "sort")}
        ${chip("availability", "Mais vagas", "sort")}
        ${chip("drive", "Menor carro", "sort")}
      </div>
      <div class="toolbar secondary-toolbar">
        ${chip("all", "Todos", "filter")}
        ${chip("cheap", "Até R$ 38", "filter")}
        ${chip("available", "Vagas altas", "filter")}
        ${chip("near", "Até 10 min a pé", "filter")}
      </div>
    </section>
    <section class="lot-list">
      ${lots.map(lotCard).join("")}
      ${lots.length ? "" : `<div class="empty-state">Nenhuma opção nesse filtro. Tente remover um critério.</div>`}
    </section>
  `;
}

function chip(value, label, type) {
  const active = type === "sort" ? state.sort === value : state.filter === value;
  return `<button class="chip ${active ? "is-active" : ""}" type="button" data-${type}="${value}">${label}</button>`;
}

function lotCard(lot) {
  const favorite = state.favorites.indexOf(lot.id) >= 0;
  const selected = state.selectedLotId === lot.id;
  return `
    <article class="section lot-card ${selected ? "is-selected" : ""}">
      <div class="lot-heading">
        <div>
          <span class="pill ${statusClass(lot.availability)}">${lot.availability}% vagas</span>
          <h3>${lot.name}</h3>
          <p>${lot.address} - ${lot.note}</p>
        </div>
        <div class="score-box compact">
          <strong>${lot.score}</strong>
          <span>score</span>
        </div>
      </div>
      <div class="metric-grid lot-metrics">
        ${metric("Hora", money(lot.hourly), "valor base")}
        ${metric("Pacote", money(lot.eventPrice), "evento/periodo")}
        ${metric("Diária", money(lot.daily), "uso prolongado")}
        ${metric("Tempo", lot.total + " min", lot.drive + " carro + " + lot.walk + " final")}
        ${metric("Ocupação", lot.occupancy + "%", lot.traffic === "alto" ? "trânsito alto" : lot.traffic === "medio" ? "trânsito médio" : "trânsito baixo")}
        ${metric("Zona", lot.zone, lot.walkRaw + " min a pé bruto")}
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" data-select-lot="${lot.id}" data-next-view="route">${selected ? "Opção selecionada" : "Escolher e ver rota"}</button>
        <button class="secondary-button" type="button" data-toggle-favorite="${lot.id}">${favorite ? "Remover favorito" : "Salvar favorito"}</button>
      </div>
    </article>
  `;
}

function renderRoute() {
  const lot = selectedLot();
  const data = scenario();
  const mode = byId(modes, state.modeId);
  elements.main.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>${lot.name} até ${data.destination.name}</h3>
          <p>Resumo do deslocamento completo considerando carro, estacionamento e trecho final.</p>
        </div>
        <span class="pill">${money(lot.totalCost)}</span>
      </div>
      <div class="route-board">
        ${routeLeg("1", "Ir de carro até o estacionamento", lot.drive + " min", lot.driveKm.toFixed(1).replace(".", ",") + " km até " + lot.zone)}
        ${routeLeg("2", "Estacionar", money(lot.eventPrice), lot.availability + "% de disponibilidade prevista")}
        ${routeLeg("3", "Seguir de " + mode.name + " até o destino", lot.walk + " min", mode.note + " - custo " + money(mode.cost))}
      </div>
      <div class="route-total">
        <div>
          <span>Tempo total estimado</span>
          <strong>${lot.total} min</strong>
        </div>
        <div>
          <span>Custo previsto</span>
          <strong>${money(lot.totalCost)}</strong>
        </div>
        <div>
          <span>Risco de lotação</span>
          <strong>${lot.occupancy}%</strong>
        </div>
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" data-action="save-route">Salvar rota</button>
        <button class="secondary-button" type="button" data-view="map">Ver mapa e relatos</button>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Trocar modal final</h3>
          <p>Escolha outra forma de sair do estacionamento sem refazer a busca.</p>
        </div>
      </div>
      <div class="modal-grid">
        ${modes.map(function (modeItem) {
          const active = modeItem.id === state.modeId;
          const minutes = Math.max(3, lot.walkRaw + modeItem.minutes);
          return `<button class="modal-card ${active ? "is-selected" : ""}" type="button" data-mode="${modeItem.id}">
            <strong>${modeItem.name}</strong>
            <span>${minutes} min - ${money(modeItem.cost)}</span>
            <p>${modeItem.note}</p>
          </button>`;
        }).join("")}
      </div>
    </section>
  `;
}

function routeLeg(index, title, value, detail) {
  return `
    <article class="route-leg">
      <span class="step-index">${index}</span>
      <div>
        <h4>${title}</h4>
        <p>${detail}</p>
      </div>
      <strong>${value}</strong>
    </article>
  `;
}

function renderMap() {
  elements.main.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Áreas críticas e regiões estratégicas</h3>
          <p>Mapa esquemático para visualizar onde evitar circular e onde estacionar melhor.</p>
        </div>
      </div>
      <div class="map-board" aria-label="Mapa esquemático do Recife Antigo">
        <div class="map-road road-one"></div>
        <div class="map-road road-two"></div>
        <div class="map-road road-three"></div>
        <div class="map-marker marker-bad" style="left: 58%; top: 26%;">Bom Jesus</div>
        <div class="map-marker marker-warn" style="left: 47%; top: 52%;">Moeda</div>
        <div class="map-marker marker-good" style="left: 23%; top: 64%;">Santo Antônio</div>
        <div class="map-marker marker-good" style="left: 71%; top: 68%;">Portuária</div>
        <div class="map-marker marker-good" style="left: 18%; top: 24%;">Capibaribe</div>
      </div>
      <div class="split-grid">
        <div>
          <h4>Evitar agora</h4>
          ${criticalAreas.map(function (area) {
            return `<article class="info-row"><strong>${area.name}</strong><span>${area.reason}</span></article>`;
          }).join("")}
        </div>
        <div>
          <h4>Recomendadas</h4>
          ${strategicRegions.map(function (area) {
            return `<article class="info-row"><strong>${area.name}</strong><span>${area.reason} - ${area.walk}</span></article>`;
          }).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h3>Relatos da comunidade</h3>
          <p>Informações em tempo real sobre trânsito, vagas, ruas e preços.</p>
        </div>
      </div>
      <form class="report-form" id="report-form">
        <select name="type" aria-label="Tipo do relato">
          <option>Trânsito</option>
          <option>Vagas</option>
          <option>Rua</option>
          <option>Preço</option>
        </select>
        <input name="place" placeholder="Local" required />
        <input name="detail" placeholder="O que aconteceu?" required />
        <button class="primary-button" type="submit">Enviar relato</button>
      </form>
      <div class="report-list">
        ${state.reports.map(function (report) {
          return `<article class="report-item">
            <div>
              <span class="pill">${escapeHtml(report.type)}</span>
              <h4>${escapeHtml(report.place)}</h4>
              <p>${escapeHtml(report.detail)}</p>
            </div>
            <strong>${report.minutes} min</strong>
          </article>`;
        }).join("")}
      </div>
    </section>
  `;
}

function renderSaved() {
  const favoriteLots = state.favorites.map(function (id) {
    return byId(enrichedLots(), id);
  });
  elements.main.innerHTML = `
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Favoritos</h3>
          <p>Estacionamentos e rotas para usar de novo em eventos recorrentes.</p>
        </div>
      </div>
      <div class="saved-list">
        ${favoriteLots.length ? favoriteLots.map(compactLotCard).join("") : `<div class="empty-state">Nenhum favorito salvo ainda.</div>`}
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <div>
          <h3>Histórico de escolhas</h3>
          <p>Últimas rotas simuladas no protótipo.</p>
        </div>
      </div>
      <div class="saved-list">
        ${state.history.length ? state.history.map(function (item) {
          return `<article class="history-card">
            <div>
              <h4>${escapeHtml(item.lotName)}</h4>
              <p>${escapeHtml(item.destination)} às ${escapeHtml(item.time)} - ${item.total} min</p>
            </div>
            <strong>${money(item.price)}</strong>
          </article>`;
        }).join("") : `<div class="empty-state">Escolha uma opção para iniciar o histórico.</div>`}
      </div>
    </section>
  `;
}

function renderContext() {
  const data = scenario();
  const lot = selectedLot();
  const best = recommendedLot();
  const mode = byId(modes, state.modeId);
  elements.context.innerHTML = `
    <section class="context-section">
      <h3>Busca atual</h3>
      <div class="context-stack">
        ${contextLine("Destino", data.destination.name)}
      ${contextLine("Horário", state.time + " - " + data.slot.tag)}
        ${contextLine("Modal final", mode.name)}
      ${contextLine("Pressão da área", data.pressure + "/10")}
      </div>
    </section>
    <section class="context-section">
      <h3>Selecionado</h3>
      <div class="selected-summary">
        <strong>${lot.name}</strong>
        <span>${money(lot.totalCost)} - ${lot.total} min - ${lot.availability}% vagas</span>
      </div>
      <button class="primary-button" type="button" data-view="route">Ver rota</button>
    </section>
    <section class="context-section">
      <h3>Melhor score</h3>
      <div class="selected-summary">
        <strong>${best.name}</strong>
        <span>${best.score} pontos - ${money(best.eventPrice)} pacote</span>
      </div>
      <button class="secondary-button" type="button" data-select-lot="${best.id}" data-next-view="route">Usar recomendado</button>
    </section>
  `;
}

function contextLine(label, value) {
  return `<div class="context-line"><span>${label}</span><strong>${value}</strong></div>`;
}

document.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.view) {
    setView(target.dataset.view);
    return;
  }

  if (target.dataset.mode) {
    state.modeId = target.dataset.mode;
    render();
    return;
  }

  if (target.dataset.sort) {
    state.sort = target.dataset.sort;
    render();
    return;
  }

  if (target.dataset.filter) {
    state.filter = target.dataset.filter;
    render();
    return;
  }

  if (target.dataset.selectLot) {
    setSelectedLot(target.dataset.selectLot);
    setView(target.dataset.nextView || state.view);
    return;
  }

  if (target.dataset.toggleFavorite) {
    toggleFavorite(target.dataset.toggleFavorite);
    render();
    return;
  }

  if (target.dataset.action === "accept-best") {
    setSelectedLot(target.dataset.id);
    setView("route");
    return;
  }

  if (target.dataset.action === "save-route") {
    setSelectedLot(state.selectedLotId);
    setView("saved");
  }
});

document.addEventListener("change", function (event) {
  if (!event.target.closest("#planner-form")) return;
  const form = event.target.form;
  state.destinationId = form.elements.destination.value;
  state.time = form.elements.time.value;
  state.selectedLotId = recommendedLot().id;
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
  saveStore();
  render();
});

elements.reset.addEventListener("click", function () {
  state.view = "plan";
  state.destinationId = "marco-zero";
  state.time = "20:00";
  state.modeId = "walk";
  state.sort = "score";
  state.filter = "all";
  state.selectedLotId = recommendedLot().id;
  render();
});

state.selectedLotId = recommendedLot().id;
render();
