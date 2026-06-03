# Coordenação de integração - Parking Zero

Este arquivo registra o alinhamento para evitar conflitos enquanto o protótipo é
editado em tempo real por mais de uma pessoa/agente.

## Como usar

- Antes de alterar arquivos, rode `git fetch --all --prune` e confira o estado
  com `git status --short --branch`.
- Compare branches novas antes de mesclar. Prefira integração manual quando a
  mudança puder apagar telas ou fluxo já publicados.
- Se uma funcionalidade já couber em uma view existente, integre nela em vez de
  criar tela duplicada.
- Mantenha o objetivo central: estacionar para não dirigir dentro do Recife
  Antigo.

## Responsabilidades informadas

- `pasn-afk`: funcionalidades 1 a 3.
- `mjsi-cloud`: funcionalidades 7 e 8.
- Vinicius: funcionalidades 9 e 10. Confirmar usuário GitHub para marcação
  correta.
- Codex: funcionalidades 4, 5 e 6.

## Mapa atual das views

- `search`: busca inicial.
- `results`: lista e comparação de estacionamentos.
- `recommended`: melhor opção recomendada.
- `route`: resumo da rota e tempo total estimado.
- `alternatives`: troca modal após estacionar.
- `traffic`: mapa de trânsito e áreas críticas.
- `history`: histórico local.

## Cuidados de integração

- Não recriar telas ou componentes que já existem em `app.js`.
- Alterações em `route`, `alternatives`, `traffic` ou `history` devem respeitar
  o fluxo atual e preservar a navegação de 7 etapas.
- Evite texto interno de backlog na interface final, como "Funcionalidade 6".
- Preferir branch/PR para mudanças simultâneas, evitando commits diretos
  concorrentes na `main`.

## Estado das funcionalidades

- Funções 1 a 3: integradas ao fluxo `search`, `results` e `recommended`.
- Função 4: integrada em `alternatives`.
- Função 5: integrada em `traffic`.
- Função 6: integrada em `route`.
- Funções 7 e 8: integradas em `history` e no contexto lateral, com resumo de
  uso, tempo evitado, modal mais usado e indicadores de impacto.
- Funções 9 e 10: confirmar escopo antes de criar novas views.

## O que ainda falta

- Receber ou confirmar o escopo das funções 9 e 10 com Vinicius.
- Fazer validação visual final em navegador assim que a equipe considerar o
  fluxo fechado.
- Abrir/mesclar PR quando houver permissão no GitHub; o conector atual não
  permitiu criar issue/PR automaticamente.
