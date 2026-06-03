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

const state = {
  screen: "fun1",
};

const screenEl = document.getElementById("phone-screen");
const pickerEl = document.getElementById("screen-picker");
const labelEl = document.getElementById("screen-label");

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
    user: "♙",
    alert: "!",
    clock: "◷",
  };
  return icons[name] || "";
}

function phoneNav(active) {
  const items = [
    ["mapa", "Mapa", "map"],
    ["buscar", "Buscar", "search"],
    ["favoritos", "Favoritos", "heart"],
    ["perfil", "Perfil", "user"],
  ];
  return `<nav class="app-nav">
    ${items.map(function (item) {
      return `<button class="${active === item[0] ? "is-active" : ""}" type="button">
        <span>${icon(item[2])}</span>${item[1]}
      </button>`;
    }).join("")}
  </nav>`;
}

function appTop(title, subtitle) {
  return `<header class="app-top">
    <button class="menu-button" type="button">${icon("menu")}</button>
    <div>
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>
  </header>`;
}

function modalOptions(active) {
  const options = [
    ["walk", "A pé", "walk"],
    ["bike", "Bike", "bike"],
    ["uber", "Uber", "car"],
    ["shuttle", "Shuttle", "bus"],
  ];
  return `<div class="modal-options">
    ${options.map(function (option) {
      return `<button class="${active === option[0] ? "is-selected" : ""}" type="button">
        <span>${icon(option[2])}</span>${option[1]}
      </button>`;
    }).join("")}
  </div>`;
}

function parkingCard(name, walk, movement, price, tone) {
  return `<article class="parking-card ${tone || ""}">
    <div class="parking-icon">${icon("park")}</div>
    <div>
      <h3>${name}</h3>
      <p>${walk}</p>
      <small>${movement}</small>
    </div>
    <strong>${price}</strong>
  </article>`;
}

function renderFun1() {
  return `
    ${appTop("Para onde você vai?")}
    <section class="form-stack">
      <label class="input-line">
        <span>${icon("pin")}</span>
        <input value="Recife Antigo, Recife - PE" readonly />
      </label>

      <div class="field-block">
        <strong>Quando?</strong>
        <label class="input-line">
          <span>${icon("calendar")}</span>
          <select>
            <option>Hoje, 20:00</option>
            <option>Hoje, 21:00</option>
            <option>Amanhã, 18:00</option>
          </select>
        </label>
      </div>

      <div class="field-block">
        <strong>Como você pretende se deslocar depois?</strong>
        ${modalOptions("walk")}
      </div>

      <button class="main-action" type="button">BUSCAR ESTACIONAMENTOS</button>
    </section>
    ${phoneNav("buscar")}
  `;
}

function renderFun2() {
  return `
    ${appTop("Estacionamentos encontrados", "Próximo ao Recife Antigo")}
    <div class="filter-row">
      <button>Ordenar por</button>
      <button>Preço</button>
      <button>Distância</button>
      <button>Tempo</button>
    </div>
    <section class="card-list">
      ${parkingCard("Estac. Paço Alfândega", "5 min a pé", "Pouco movimento", "R$ 18,00", "best")}
      ${parkingCard("Estac. RioMar Recife", "15 min a pé", "Médio movimento", "R$ 12,00", "")}
      ${parkingCard("Estac. Bairro do Recife", "8 min a pé", "Muito movimento", "R$ 20,00", "warning")}
    </section>
    ${phoneNav("buscar")}
  `;
}

function renderFun4() {
  return `
    ${appTop("Depois de estacionar", "Estac. Paço Alfândega")}
    <section class="route-panel">
      <h3>Como chegar ao destino?</h3>
      <article class="transport-row selected"><span>${icon("walk")}</span><strong>A pé</strong><em>5 min</em><small>Grátis</small></article>
      <article class="transport-row"><span>${icon("bike")}</span><strong>Bike</strong><em>6 min</em><small>~150 kcal</small></article>
      <article class="transport-row"><span>${icon("car")}</span><strong>Uber</strong><em>7 min</em><small>R$ 10 - 15</small></article>
      <article class="transport-row"><span>${icon("bus")}</span><strong>Shuttle Centro</strong><em>8 min</em><small>R$ 4,00</small></article>
      <div class="recommend-box">
        <strong>Recomendamos: A pé</strong>
        <p>Mais rápido e econômico!</p>
      </div>
      <button class="main-action" type="button">INICIAR ROTA</button>
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
      <div class="map-dot car-dot">${icon("car")}</div>
      <div class="map-dot park-dot one">${icon("park")}</div>
      <div class="map-dot park-dot two">${icon("park")}</div>
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
  return `
    ${appTop("Resumo da rota")}
    <section class="summary-stack">
      <article class="summary-card">
        <span>${icon("car")}</span>
        <div><h3>Até o estacionamento</h3><p>12 min</p></div>
        <strong>4,2 km</strong>
      </article>
      <article class="summary-card">
        <span>${icon("walk")}</span>
        <div><h3>Caminhada até o destino</h3><p>5 min</p></div>
        <strong>350 m</strong>
      </article>
      <article class="summary-card highlight">
        <span>${icon("clock")}</span>
        <div><h3>Tempo total estimado</h3></div>
        <strong>25 min</strong>
      </article>
      <button class="main-action" type="button">INICIAR NAVEGAÇÃO</button>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun7() {
  return `
    ${appTop("Relatos da comunidade")}
    <div class="filter-row report-filter">
      <button class="is-active">Todos</button>
      <button>Trânsito</button>
      <button>Vagas</button>
      <button>Rua</button>
    </div>
    <section class="report-list">
      <article class="report-card danger"><span>${icon("alert")}</span><div><h3>Trânsito intenso na Rua do Bom Jesus</h3><p>Agora há pouco</p></div></article>
      <article class="report-card info"><span>${icon("park")}</span><div><h3>Estac. Bairro do Recife lotado</h3><p>10 min atrás</p></div></article>
      <article class="report-card warn"><span>${icon("alert")}</span><div><h3>Rua da Moeda parcialmente bloqueada</h3><p>25 min atrás</p></div></article>
      <button class="main-action" type="button">ENVIAR RELATO</button>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun8() {
  return `
    ${appTop("Regiões recomendadas", "Estacione nessas áreas e vá a pé ou de bike.")}
    <section class="region-map">
      <div class="map-grid"></div>
      <div class="green-area area-one"></div>
      <div class="green-area area-two"></div>
      <div class="green-area area-three"></div>
      <div class="map-dot park-dot one">${icon("park")}</div>
      <div class="map-dot park-dot two">${icon("park")}</div>
      <div class="map-dot park-dot three">${icon("park")}</div>
    </section>
    <section class="region-list">
      <article><span>${icon("park")}</span><div><h3>Zona Portuária</h3><p>10 min a pé</p><small>Pouco movimento</small></div></article>
      <article><span>${icon("park")}</span><div><h3>Santo Antônio</h3><p>12 min a pé</p><small>Pouco movimento</small></div></article>
    </section>
    ${phoneNav("mapa")}
  `;
}

function renderFun9() {
  return `
    ${appTop("Favoritos")}
    <section class="favorite-list">
      <article><button>${icon("heart")}</button><div><h3>Estac. Paço Alfândega</h3><p>5 min a pé</p></div><button>${icon("heart")}</button></article>
      <article><button>${icon("heart")}</button><div><h3>Estac. RioMar Recife</h3><p>15 min a pé</p></div><button>${icon("heart")}</button></article>
      <article><button>${icon("heart")}</button><div><h3>Zona Portuária</h3><p>10 min a pé</p></div><button>${icon("heart")}</button></article>
      <button class="main-action" type="button">ADICIONAR</button>
    </section>
    ${phoneNav("favoritos")}
  `;
}

function renderScreen() {
  const active = screens.find(function (screen) {
    return screen.id === state.screen;
  }) || screens[0];
  labelEl.textContent = active.label;

  pickerEl.innerHTML = screens.map(function (screen) {
    return `<button class="${screen.id === state.screen ? "is-active" : ""}" type="button" data-screen="${screen.id}">
      <span>${screen.label}</span>${screen.title}
    </button>`;
  }).join("");

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
  const button = event.target.closest("[data-screen]");
  if (!button) return;
  state.screen = button.dataset.screen;
  renderScreen();
});

renderScreen();
