# ADR-002 — Supabase como Backend-as-a-Service (BaaS)

## Status
Aceito

## Contexto
Necessidade de banco PostgreSQL gerenciado, autenticação segura e controle de acesso por linha (RLS) sem infraestrutura própria.

## Decisão
Utilizar Supabase como camada de dados e autenticação: PostgreSQL gerenciado, Supabase Auth (magic link/email+senha) e RLS policies.

## Justificativa
- RLS nativo elimina necessidade de lógica de autorização no aplicativo para restrições de banco.
- Auth pronto com suporte a magic link reduz superfície de ataque (sem senhas armazenadas localmente).
- Criptografia em repouso e TLS em trânsito providos nativamente — requisito LGPD atendido sem esforço adicional.
- PostgreSQL padrão: migração para instância própria possível sem reescrita de queries.

## Consequências
- **Positivas**: segurança por padrão, conformidade LGPD facilitada, zero ops de banco.
- **Negativas**: dependência de SaaS externo; limites do plano gratuito (500 MB, 50.000 MAU) adequados ao escopo.

## Alternativas Rejeitadas
- PlanetScale: sem suporte a RLS nativo.
- Firebase Firestore: NoSQL inadequado para constraints relacionais (UNIQUE composta).
- RDS próprio: overhead operacional desnecessário.
