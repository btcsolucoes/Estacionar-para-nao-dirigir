const screens = [
  { id: "fun1", label: "FUN 1", title: "Buscar estacionamentos" },
  { id: "fun2", label: "FUN 2", title: "Comparar opções" },
  { id: "fun4", label: "FUN 4", title: "Sugerir troca modal" },
  { id: "fun5", label: "FUN 5", title: "Exibir áreas críticas" },
  { id: "fun6", label: "FUN 6", title: "Estimar tempo da rota" },
  { id: "fun7", label: "FUN 7", title: "Receber relatos" },
  { id: "fun8", label: "FUN 8", title: "Recomendar regiões estratégicas" },
  { id: "fun9", label: "FUN 9", title: "Salvar histórico" },
];

const destinations = [
  "Recife Antigo, Recife - PE",
  "Marco Zero",
  "Paço do Frevo",
  "Rua da Moeda",
  "Cais do Sertão",
  "Rua do Bom Jesus",
  "Armazém 14",
];

const times = ["Hoje, 18:00", "Hoje, 19:00", "Hoje, 20:00", "Hoje, 21:00", "Amanhã, 18:00"];

const lots = [
  { id: "paco", name: "Estac. Paço Alfândega", walk: 5, move: "Pouco movimento", price: 18, drive: 12, km: "4,2 km", tone: "best" },
  { id: "riomar", name: "Estac. RioMar Recife", walk: 15, move: "Médio movimento", price: 12, drive: 18, km: "6,8 km", tone: "" },
  { id: "bairro", name: "Estac. Bairro do Recife", walk: 8, move: "Muito movimento", price: 20, drive: 14, km: "4,6 km", tone: "warning" },
  { id: "portuaria", name: "Zona Portuária", walk: 10, move: "Pouco movimento", price: 14, drive: 15, km: "5,7 km", tone: "best" },
];

const modes = [
  { id: "walk", label: "A pé", icon: "walk", delta: 0, cost: "Grátis", detail: "Mais rápido e econômico!" },
  { id: "bike", label: "Bike", icon: "bike", delta: 1, cost: "~150 kcal", detail: "Bom para economizar tempo sem carro." },
  { id: "uber", label: "Uber", icon: "car", delta: 2, cost: "R$ 10 - 15", detail: "Melhor para noite ou chuva." },
  { id: "shuttle", label: "Shuttle Centro", icon: "bus", delta: 3, cost: "R$ 4,00", detail: "Boa opção em evento grande." },
];

const defaultReports = [
  { type: "Trânsito", title: "Trânsito intenso na Rua do Bom Jesus", time: "Agora há pouco", tone: "danger" },
  { type: "Vagas", title: "Estac. Bairro do Recife lotado", time: "10 min atrás", tone: "info" },
  { type: "Rua", title: "Rua da Moeda parcialmente bloqueada", time: "25 min atrás", tone: "warn" },
];

const saved = readSaved();
const state = {
  screen: "fun1",
  destination: saved.destination || destinations[0],
  time: saved.time || "Hoje, 20:00",
  mode: saved.mode || "walk",
  selectedLot: saved.selectedLot || "paco",
  sort: "default",
  reportFilter: "Todos",
  composingReport: false,
  routeStarted: false,
  menuOpen: false,
  favorites: saved.favorites || ["paco", "riomar", "portuaria"],
  history: saved.history || [],
  reports: saved.reports || defaultReports,
};

const screenEl = document.getElementById("phone-screen");
const pickerEl = document.getElementById("screen-picker");
const labelEl = document.getElementById("screen-label");

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem("parking-zero-wire-app") || "{}");
  } catch (error) {
    return {};
  }
}

function saveState() {
  localStorage.setItem(
    "parking-zero-wire-app",
    JSON.stringify({
      destination: state.destination,
      time: state.time,
      mode: state.mode,
      selectedLot: state.selectedLot,
      favorites: state.favorites,
      history: state.history.slice(0, 8),
      reports: state.reports.slice(0, 8),
    }),
  );
}

function icon(name) {
  const icons = {
    menu: "☰",
    pin: "●",
    calendar: "□",
    walk: "♟",
    bike: "◇",
    car: "▰",
    bus: "▣",
    park: "P",
    search: "⌕",
    heart: "♡",
    heartFull: "♥",
    user: "♙",
    alert: "!",
    clock: "◷",
    map: "⌖",
  };
  return icons[name] || "";
}

function money(value) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

function currentLot() {
  return lots.find(function (lot) {
    return lot.id === state.selectedLot;
  }) || lots[0];
}

function currentMode() {
  return modes.find(function (mode) {
    return mode.id === state.mode;
  }) || modes[0];
}

function finalWalk(lot, mode) {
  return Math.max(4, lot.walk + mode.delta);
}

function totalTime(lot, mode) {
  return lot.drive + finalWalk(lot, mode);
}

function sortedLots() {
  const ordered = lots.slice();
  if (state.sort === "Preço") {
    ordered.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  if (state.sort === "Distância") {
    ordered.sort(function (a, b) {
      return a.walk - b.walk;
    });
  }
  if (state.sort === "Tempo") {
    ordered.sort(function (a, b) {
      return totalTime(a, currentMode()) - totalTime(b, currentMode());
    });
  }
  return ordered;
}

function phoneNav(active) {
  const items = [
    ["mapa", "Mapa", "map", "fun5"],
    ["buscar", "Buscar", "search", "fun1"],
    ["favoritos", "Favoritos", "heart", "fun9"],
    ["perfil", "Perfil", "user", "fun4"],
  ];
  return `<nav class="app-nav">
    ${items.map(function (item) {
      return `<button class="${active === item[0] ? "is-active" : ""}" type="button" data-nav="${item[3]}">
        <span>${icon(item[2])}</span>${item[1]}
      </button>`;
    }).join("")}
  </nav>`;
}

function appTop(title, subtitle) {
  return `<header class="app-top">
    <button class="menu-button" type="button" data-action="menu">${icon("menu")}</button>
    <div>
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>
  </header>
  ${state.menuOpen ? featureMenu() : ""}`;
}

function featureMenu() {
  return `<section class="feature-menu" aria-label="Funcionalidades">
    ${screens.map(function (screen) {
      return `<button class="${screen.id === state.screen ? "is-active" : ""}" type="button" data-screen="${screen.id}">
        <span>${screen.label}</span>${screen.title}
      </button>`;
    }).join("")}
  </section>`;
}

function selectOptions(items, selected) {
  return items.map(function (item) {
    return `<option ${item === selected ? "selected" : ""}>${item}</option>`;
  }).join("");
}

function modalOptions(active) {
  return `<div class="modal-options">
    ${modes.map(function (mode) {
      return `<button class="${active === mode.id ? "is-selected" : ""}" type="button" data-mode="${mode.id}">
        <span>${icon(mode.icon)}</span>${mode.label.replace(" Centro", "")}
      </button>`;
    }).join("")}
  </div>`;
}

function parkingCard(lot) {
  const selected = lot.id === state.selectedLot;
  return `<article class="parking-card ${lot.tone || ""} ${selected ? "selected" : ""}" data-parking="${lot.id}">
    <div class="parking-icon">${icon("park")}</div>
    <div>
      <h3>${lot.name}</h3>
      <p>${lot.walk} min a pé</p>
      <small>${lot.move}</small>
    </div>
    <strong>${money(lot.price)}</strong>
  </article>`;
}

function renderFun1() {
  return `
    ${appTop("Para onde você vai?")}
    <section class="form-stack">
      <label class="input-line">
        <span>${icon("pin")}</span>
        <select data-field="destination">${selectOptions(destinations, state.destination)}</select>
      </label>

      <div class="field-block">
        <strong>Quando?</strong>
        <label class="input-line">
          <span>${icon("calendar")}</span>
          <select data-field="time">${selectOptions(times, state.time)}</select>
        </label>
      </div>

      <div class="field-block">
        <strong>Como você pretende se deslocar depois?</strong>
        ${modalOptions(state.mode)}
      </div>

      <button class="main-action" type="button" data-action="search">BUSCAR ESTACIONAMENTOS</button>
    </section>
    ${phoneNav("buscar")}
  `;
}

function renderFun2() {
  return `
    ${appTop("Estacionamentos encontrados", "Próximo ao Recife Antigo")}
    <div class="filter-row">
      ${["Ordenar por", "Preço", "Distância", "Tempo"].map(function (sort) {
        const active = state.sort === sort || (sort === "Ordenar por" && state.sort === "default");
        return `<button class="${active ? "is-active" : ""}" type="button" data-sort="${sort}">${sort}</button>`;
      }).join("")}
    </div>
    <section class="card-list">
      ${sortedLots().map(parkingCard).join("")}
      <p class="helper-text">Toque em um estacionamento para calcular a rota.</p>
    </section>
    ${phoneNav("buscar")}
  `;
}

function renderFun4() {
  const lot = currentLot();
  const mode = currentMode();
  return `
    ${appTop("Depois de estacionar", lot.name)}
    <section class="route-panel">
      <h3>Como chegar ao destino?</h3>
      ${modes.map(function (item) {
        const selected = item.id === state.mode;
        return `<article class="transport-row ${selected ? "selected" : ""}" data-mode="${item.id}">
          <span>${icon(item.icon)}</span>
          <strong>${item.label}</strong>
          <em>${finalWalk(lot, item)} min</em>
          <small>${item.cost}</small>
        </article>`;
      }).join("")}
      <div class="recommend-box">
        <strong>Recomendamos: ${mode.label}</strong>
        <p>${mode.detail}</p>
      </div>
      <button class="main-action" type="button" data-action="route">INICIAR ROTA</button>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun5() {
  return `
    ${appTop("Mapa de trânsito")}
    <section class="traffic-map">
      <div class="map-grid"></div>
      <div class="route-line line-red"></div>
      <div class="route-line line-yellow"></div>
      <div class="route-line line-green"></div>
      <button class="map-dot car-dot" type="button" data-action="traffic-alert">${icon("car")}</button>
      <button class="map-dot park-dot one" type="button" data-parking="paco">${icon("park")}</button>
      <button class="map-dot park-dot two" type="button" data-parking="bairro">${icon("park")}</button>
      <div class="user-dot"></div>
      <div class="legend-box">
        <p><span class="legend red"></span>Muito congestionado</p>
        <p><span class="legend yellow"></span>Congestionado</p>
        <p><span class="legend green"></span>Pouco movimento</p>
        <p><span class="legend gray"></span>Baixa disponibilidade de vagas</p>
      </div>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun6() {
  const lot = currentLot();
  const mode = currentMode();
  const startedText = state.routeStarted ? "NAVEGAÇÃO INICIADA" : "INICIAR NAVEGAÇÃO";
  return `
    ${appTop("Resumo da rota", lot.name)}
    <section class="summary-stack">
      <article class="summary-card">
        <span>${icon("car")}</span>
        <div><h3>Até o estacionamento</h3><p>${lot.drive} min</p></div>
        <strong>${lot.km}</strong>
      </article>
      <article class="summary-card">
        <span>${icon(mode.icon)}</span>
        <div><h3>${mode.label} até o destino</h3><p>${finalWalk(lot, mode)} min</p></div>
        <strong>${lot.walk * 70} m</strong>
      </article>
      <article class="summary-card highlight">
        <span>${icon("clock")}</span>
        <div><h3>Tempo total estimado</h3></div>
        <strong>${totalTime(lot, mode)} min</strong>
      </article>
      <button class="main-action" type="button" data-action="start-navigation">${startedText}</button>
      <button class="secondary-action" type="button" data-action="save-route">SALVAR NO HISTÓRICO</button>
    </section>
    ${phoneNav("mapa")}
  `;
}

function visibleReports() {
  if (state.reportFilter === "Todos") return state.reports;
  return state.reports.filter(function (report) {
    return report.type === state.reportFilter;
  });
}

function renderReportForm() {
  if (!state.composingReport) return "";
  return `<form class="report-compose" id="report-compose">
    <select name="type">
      <option>Trânsito</option>
      <option>Vagas</option>
      <option>Rua</option>
      <option>Preço</option>
    </select>
    <input name="title" placeholder="Descreva o relato" required />
    <button class="main-action" type="submit">PUBLICAR</button>
  </form>`;
}

function renderFun7() {
  return `
    ${appTop("Relatos da comunidade")}
    <div class="filter-row report-filter">
      ${["Todos", "Trânsito", "Vagas", "Rua"].map(function (type) {
        return `<button class="${state.reportFilter === type ? "is-active" : ""}" type="button" data-report-filter="${type}">${type}</button>`;
      }).join("")}
    </div>
    <section class="report-list">
      ${renderReportForm()}
      ${visibleReports().map(function (report) {
        const iconName = report.type === "Vagas" ? "park" : "alert";
        return `<article class="report-card ${report.tone}"><span>${icon(iconName)}</span><div><h3>${escapeText(report.title)}</h3><p>${escapeText(report.time)}</p></div></article>`;
      }).join("")}
      <button class="main-action" type="button" data-action="compose-report">${state.composingReport ? "CANCELAR" : "ENVIAR RELATO"}</button>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun8() {
  return `
    ${appTop("Regiões recomendadas", "Estacione nessas áreas e vá a pé ou de bike.")}
    <section class="region-map">
      <div class="map-grid"></div>
      <button class="green-area area-one" type="button" data-region="portuaria"></button>
      <button class="green-area area-two" type="button" data-region="santo"></button>
      <button class="green-area area-three" type="button" data-region="paco"></button>
      <button class="map-dot park-dot one" type="button" data-parking="portuaria">${icon("park")}</button>
      <button class="map-dot park-dot two" type="button" data-parking="paco">${icon("park")}</button>
      <button class="map-dot park-dot three" type="button" data-parking="bairro">${icon("park")}</button>
    </section>
    <section class="region-list">
      <article data-region="portuaria"><span>${icon("park")}</span><div><h3>Zona Portuária</h3><p>10 min a pé</p><small>Pouco movimento</small></div></article>
      <article data-region="santo"><span>${icon("park")}</span><div><h3>Santo Antônio</h3><p>12 min a pé</p><small>Pouco movimento</small></div></article>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun9() {
  const favoriteLots = lots.filter(function (lot) {
    return state.favorites.indexOf(lot.id) >= 0;
  });
  return `
    ${appTop("Favoritos")}
    <section class="favorite-list">
      ${favoriteLots.length ? favoriteLots.map(function (lot) {
        return `<article data-parking="${lot.id}">
          <button type="button" data-favorite="${lot.id}">${icon("heartFull")}</button>
          <div><h3>${lot.name}</h3><p>${lot.walk} min a pé</p></div>
          <button type="button" data-favorite="${lot.id}">${icon("heartFull")}</button>
        </article>`;
      }).join("") : `<div class="empty-state">Nenhum favorito salvo.</div>`}
      ${state.history.length ? `<div class="history-box"><strong>Histórico</strong>${state.history.map(function (item) {
        return `<p>${escapeText(item)}</p>`;
      }).join("")}</div>` : ""}
      <button class="main-action" type="button" data-action="add-current-favorite">ADICIONAR ATUAL</button>
    </section>
    ${phoneNav("favoritos")}
  `;
}

function goTo(screen) {
  state.screen = screen;
  state.menuOpen = false;
  renderScreen();
}

function renderScreen() {
  const active = screens.find(function (screen) {
    return screen.id === state.screen;
  }) || screens[0];
  if (labelEl) labelEl.textContent = active.label;
  if (pickerEl) {
    pickerEl.innerHTML = screens.map(function (screen) {
      return `<button class="${screen.id === state.screen ? "is-active" : ""}" type="button" data-screen="${screen.id}">
        <span>${screen.label}</span>${screen.title}
      </button>`;
    }).join("");
  }

  const renderers = {
    fun1: renderFun1,
    fun2: renderFun2,
    fun4: renderFun4,
    fun5: renderFun5,
    fun6: renderFun6,
    fun7: renderFun7,
    fun8: renderFun8,
    fun9: renderFun9,
  };
  screenEl.innerHTML = renderers[state.screen]();
}

document.addEventListener("click", function (event) {
  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) {
    goTo(screenButton.dataset.screen);
    return;
  }

  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    goTo(navButton.dataset.nav);
    return;
  }

  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) {
    state.mode = modeButton.dataset.mode;
    saveState();
    renderScreen();
    return;
  }

  const sortButton = event.target.closest("[data-sort]");
  if (sortButton) {
    state.sort = sortButton.dataset.sort === "Ordenar por" ? "default" : sortButton.dataset.sort;
    renderScreen();
    return;
  }

  const reportFilter = event.target.closest("[data-report-filter]");
  if (reportFilter) {
    state.reportFilter = reportFilter.dataset.reportFilter;
    renderScreen();
    return;
  }

  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    const id = favorite.dataset.favorite;
    if (state.favorites.indexOf(id) >= 0) {
      state.favorites = state.favorites.filter(function (item) {
        return item !== id;
      });
    } else {
      state.favorites.push(id);
    }
    saveState();
    renderScreen();
    return;
  }

  const parking = event.target.closest("[data-parking]");
  if (parking) {
    state.selectedLot = parking.dataset.parking;
    state.routeStarted = false;
    saveState();
    goTo("fun6");
    return;
  }

  const region = event.target.closest("[data-region]");
  if (region) {
    state.selectedLot = region.dataset.region === "santo" ? "portuaria" : region.dataset.region;
    saveState();
    goTo("fun2");
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (action.dataset.action === "menu") {
    state.menuOpen = !state.menuOpen;
    renderScreen();
    return;
  }
  if (action.dataset.action === "traffic-alert") {
    state.reportFilter = "Trânsito";
    goTo("fun7");
    return;
  }
  if (action.dataset.action === "search") {
    goTo("fun2");
    return;
  }
  if (action.dataset.action === "route") {
    goTo("fun6");
    return;
  }
  if (action.dataset.action === "start-navigation") {
    state.routeStarted = true;
    renderScreen();
    return;
  }
  if (action.dataset.action === "save-route") {
    const lot = currentLot();
    const entry = `${lot.name} - ${totalTime(lot, currentMode())} min`;
    state.history = [entry].concat(state.history.filter(function (item) {
      return item !== entry;
    })).slice(0, 4);
    if (state.favorites.indexOf(lot.id) < 0) state.favorites.push(lot.id);
    saveState();
    goTo("fun9");
    return;
  }
  if (action.dataset.action === "compose-report") {
    state.composingReport = !state.composingReport;
    renderScreen();
    return;
  }
  if (action.dataset.action === "add-current-favorite") {
    const id = state.selectedLot;
    if (state.favorites.indexOf(id) < 0) state.favorites.push(id);
    saveState();
    renderScreen();
  }
});

document.addEventListener("change", function (event) {
  const field = event.target.dataset.field;
  if (!field) return;
  state[field] = event.target.value;
  saveState();
});

document.addEventListener("submit", function (event) {
  if (!event.target.matches("#report-compose")) return;
  event.preventDefault();
  const form = event.target;
  const type = form.elements.type.value;
  state.reports = [{
    type: type,
    title: form.elements.title.value,
    time: "Agora",
    tone: type === "Trânsito" ? "danger" : type === "Vagas" ? "info" : "warn",
  }].concat(state.reports).slice(0, 8);
  state.composingReport = false;
  state.reportFilter = "Todos";
  saveState();
  renderScreen();
});

renderScreen();
