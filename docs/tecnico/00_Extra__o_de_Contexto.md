# Extração de Contexto — Livro de Visitas Digital (Museu)

## Domínio
Registro digital de visitas a museu, substituindo livro físico em papel.

## Atores
- **Visitante**: preenche formulário público no totem/dispositivo do museu.
- **Admin**: consulta listagem paginada via área restrita.
- **Direção**: consome dados agregados para decisão.

## Entidade Central
`visit_entries` — id, full_name, email, phone, visit_date, created_at.

## Regras de Negócio Críticas
1. Nome completo ≥ 2 palavras.
2. E-mail válido + único por (email, visit_date).
3. Telefone opcional com DDD válido.
4. Data ≤ hoje (não futura).
5. Registros imutáveis (sem PUT/PATCH/DELETE público).

## Restrições
- Volume baixo, equipe reduzida, prazo curto.
- LGPD: coleta mínima, acesso restrito, exclusão sob demanda pelo admin.
- Disponibilidade no horário do museu; tolerância a interrupções fora dele.
- Resposta < 3 s em condições normais.

## Decisões Pré-existentes
- Stack: Next.js 14 + TypeScript, Supabase (PostgreSQL + Auth), Vercel.
- Monólito fullstack deliberado — sem microsserviços.
