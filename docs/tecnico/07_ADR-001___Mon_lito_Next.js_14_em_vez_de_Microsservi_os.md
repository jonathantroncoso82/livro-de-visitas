# ADR-001 — Monólito Next.js 14 em vez de Microsserviços

## Status
Aceito

## Contexto
Sistema de livro de visitas com volume baixo, equipe reduzida, prazo curto e sem requisito de escalabilidade elevada. Duas rotas principais e uma entidade de dados.

## Decisão
Adotar aplicação fullstack monolítica em Next.js 14 (App Router) hospedada na Vercel, sem backend separado ou microsserviços.

## Justificativa
- Complexidade operacional mínima: sem orquestração de containers, service mesh ou API gateway dedicado.
- Deploy atômico: frontend e Route Handlers versionados juntos.
- Compartilhamento de schemas Zod entre cliente e servidor sem pacotes extras.
- Custo zero na camada de hospedagem (Vercel free tier adequado ao volume).

## Consequências
- **Positivas**: velocidade de entrega, manutenção simples, onboarding rápido.
- **Negativas**: se o volume crescer significativamente, extração de serviços será necessária. Aceitável dado o escopo declarado.

## Alternativas Rejeitadas
- NestJS + React SPA: overhead desnecessário para o escopo.
- Microsserviços: complexidade desproporcional ao problema.
