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
- `traffic`: regiões estratégicas e relatos colaborativos.
- `history`: favoritos e histórico local de rotas.

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
- Função 7: integrada em `traffic`, com relatos colaborativos filtráveis e envio
  de relato sobre trânsito, vagas, ruas ou preço.
- Função 8: integrada em `traffic`, com regiões estratégicas recomendadas fora
  das zonas de maior fluxo.
- Função 9: integrada em `history`, com favoritos e rotas salvas para eventos
  recorrentes.
- Função 10: aguardar explicação se fizer parte do escopo final.

## O que ainda falta

- Receber ou confirmar se existe uma função 10 no escopo final.
- Revisar com a equipe se alguma funcionalidade adicional deve entrar em views
  existentes ou se exige um novo ponto do fluxo.

## Última validação

- Integração publicada em `origin/main` no commit `5652dc6`.
- Chrome headless abriu o app estático localmente e validou o fluxo: busca,
  comparação, rota, troca modal, salvamento no histórico e indicadores de
  impacto.
- Capturas desktop e mobile foram conferidas localmente sem adicionar arquivos
  temporários ao repositório.
