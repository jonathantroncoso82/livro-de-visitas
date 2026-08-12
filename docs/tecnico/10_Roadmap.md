# Roadmap — Livro de Visitas Digital

## Fase 1 — MVP (Semanas 1–3)
- [ ] Setup do repositório Next.js 14 + TypeScript.
- [ ] Configuração do projeto Supabase (tabela, RLS, Auth).
- [ ] Formulário público `/` com React Hook Form + Zod.
- [ ] Route Handler POST `/api/visits` com validação server-side.
- [ ] Página `/admin` com autenticação Supabase Auth.
- [ ] Route Handler GET `/api/visits` protegido + listagem paginada.
- [ ] Deploy na Vercel com secrets configurados.
- [ ] Testes manuais de fluxo completo.

## Fase 2 — Estabilização (Semanas 4–5)
- [ ] Testes automatizados (Vitest + Testing Library).
- [ ] Tratamento de erros e feedback visual aprimorado.
- [ ] Configuração de alertas de erro (Vercel Analytics ou Sentry free tier).
- [ ] Documentação de operação para o admin (exclusão LGPD via Supabase Studio).

## Fase 3 — Melhorias Futuras (Backlog)
- [ ] Exportação de registros em CSV para a equipe administrativa.
- [ ] Dashboard com métricas de visitação (contagem por período).
- [ ] Integração com ferramenta de e-mail marketing para relacionamento.
- [ ] Internacionalização (i18n) caso o museu receba visitantes estrangeiros.
- [ ] Modo offline com sincronização posterior (PWA) para totem sem internet estável.
