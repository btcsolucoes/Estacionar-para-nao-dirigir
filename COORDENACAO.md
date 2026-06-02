# Coordenação de integração - Parking Zero

Este arquivo registra o alinhamento para evitar conflitos enquanto o protótipo está sendo editado em tempo real.

## Estado observado

- `origin/main` está no commit `a557a20` (`Harmonizar fluxo com telas do backlog`).
- A branch `codex/parking-zero-prototype` foi harmonizada com a `main` no commit `86b2bc9`.
- O delta atual da branch do Codex contra `main` está concentrado em `README.md`, `app.js` e `styles.css`.

## Responsabilidades informadas

- `pasn-afk`: funcionalidades 1 a 3.
- `mjsi-cloud`: funcionalidades 7 e 8.
- Vinicius: funcionalidades 9 e 10. Confirmar usuário GitHub para marcação correta.
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
- Antes de adicionar uma funcionalidade, verificar se ela encaixa em uma view existente.
- Se mexer em `route`, `alternatives`, `traffic` ou `history`, avisar a equipe antes do merge.
- Manter o objetivo central: estacionar para não dirigir dentro do Recife Antigo.
- Preferir branch/PR para mudanças simultâneas, evitando commits diretos concorrentes na `main`.

## Estado das funcionalidades

- Funções 1 a 3: integradas ao fluxo `search`, `results` e `recommended`.
- Função 4: integrada em `alternatives`.
- Função 5: integrada em `traffic`.
- Função 6: integrada em `route`.
- Funções 7 e 8: devem se integrar principalmente a `history` ou contexto lateral.
- Funções 9 e 10: confirmar escopo antes de criar novas views.
