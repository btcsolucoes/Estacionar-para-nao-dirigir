# Parking Zero

Protótipo acadêmico para ajudar usuários a estacionar em pontos estratégicos e
evitar circular de carro dentro do Recife Antigo.

## Objetivo

O aplicativo reforça a lógica central do projeto:

> Estacionar para não dirigir dentro do Recife Antigo.

O usuário informa o destino, compara estacionamentos próximos, recebe uma opção
recomendada por score e escolhe como seguir depois de estacionar: a pé, bike,
Uber, shuttle ou ônibus.

## Funcionalidades implementadas

- Busca inicial com destino, horário e modo de deslocamento após estacionar.
- Lista de estacionamentos encontrados.
- Comparação por score, preço, distância e trânsito.
- Recomendação automática da melhor opção.
- Resumo da rota em etapas com tempo total estimado.
- Alternativas de mobilidade após estacionar, com recomendação de troca modal.
- Mapa de trânsito simulado com áreas críticas e baixa disponibilidade.
- Histórico local de rotas salvas.

## Como abrir

Abra o arquivo `index.html` diretamente no navegador.

Esta primeira versão é estática, feita com HTML, CSS e JavaScript puro, porque o
ambiente atual não tem Node.js/npm instalado. A estrutura pode ser migrada para
React/Vite quando a equipe decidir.
