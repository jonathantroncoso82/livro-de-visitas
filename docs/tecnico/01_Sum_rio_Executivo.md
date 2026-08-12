# Sumário Executivo — Livro de Visitas Digital

## Objetivo
Digitalizar o livro de visitas do museu, eliminando papel e viabilizando consulta histórica e relacionamento com visitantes.

## Solução
Aplicação fullstack monolítica em Next.js 14 (App Router), hospedada na Vercel, com banco PostgreSQL gerenciado pelo Supabase. Formulário público para visitantes e área admin protegida por Supabase Auth.

## Benefícios Esperados
- Eliminação de perda de dados por deterioração física.
- Consulta instantânea de registros históricos.
- Base para ações de relacionamento e fidelização.
- Conformidade com LGPD desde a concepção.

## Riscos Mitigados
- **Dados corrompidos**: validação dupla (cliente + servidor) com Zod.
- **Acesso indevido**: RLS no Supabase + Supabase Auth.
- **Vendor lock-in**: Supabase é PostgreSQL padrão; migração possível.

## Escopo Fora
- Relatórios analíticos avançados.
- Integração com CRM externo.
- Alta disponibilidade (SLA formal).
