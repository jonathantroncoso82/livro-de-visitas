# Blueprint Técnico

## Arquitetura-alvo

O sistema é uma aplicação fullstack monolítica leve construída inteiramente em Next.js 14 com App Router, hospedada na Vercel. A escolha de uma única aplicação Next.js é deliberada e adequada ao escopo: volume baixo de acessos, equipe reduzida, prazo curto e ausência de requisitos de escalabilidade elevada. Não há necessidade de microsserviços ou backend separado.

CAMADA DE APRESENTAÇÃO (Frontend): Páginas React com Server Components para renderização eficiente. Duas rotas principais: (1) `/` — formulário público de registro de visita, acessível pelo visitante no totem ou dispositivo do museu, com campos nome completo, e-mail, telefone (opcional) e data da visita; (2) `/admin` — área restrita para a equipe administrativa, protegida por autenticação via Supabase Auth (magic link ou e-mail/senha), exibindo listagem paginada dos registros. O formulário público utiliza React Hook Form com schema Zod para validação no cliente antes do envio, garantindo feedback imediato ao visitante.

CAMADA DE API (Backend): Route Handlers do Next.js (`/api/visits` — POST para criação; `/api/visits` — GET protegido para listagem). Toda lógica de negócio é validada novamente no servidor com Zod (nunca confiando apenas no cliente): obrigatoriedade de nome completo (mínimo duas palavras), e-mail com formato válido, unicidade de e-mail por data de visita, data não futura, telefone com DDD válido quando informado. Os registros são imutáveis por design: não existem endpoints de PUT, PATCH ou DELETE, e a política RLS do Supabase reforça essa restrição no nível do banco.

CAMADA DE DADOS (Banco): PostgreSQL no Supabase com uma tabela central `visit_entries` (id UUID, full_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, visit_date DATE NOT NULL, created_at TIMESTAMPTZ DEFAULT now()). RLS habilitado: a role anônima possui apenas permissão INSERT; a role autenticada (admin) possui permissão SELECT. Constraint UNIQUE em (email, visit_date) garante a regra de negócio de unicidade. Criptografia em repouso e TLS em trânsito são providos nativamente pelo Supabase. Variáveis de conexão armazenadas como secrets na Vercel, nunca expostas ao cliente.

SEGURANÇA E LGPD: Acesso à listagem restrito a usuários autenticados via Supabase Auth. RLS como segunda camada de defesa no banco. Dados coletados exclusivamente para a finalidade declarada. Exclusão de registros mediante solicitação do titular pode ser executada diretamente no Supabase pelo administrador com log de auditoria, respeitando a LGPD sem expor endpoint público de deleção. Criptografia em repouso e em trânsito garantidas pela infraestrutura.

FLUXO PRINCIPAL: Visitante acessa o formulário → preenche dados → validação client-side (Zod + React Hook Form) → POST para Route Handler → validação server-side (Zod) → INSERT no Supabase com RLS → resposta de sucesso em menos de 3 segundos. Admin acessa `/admin` → autenticação Supabase Auth → GET protegido → listagem paginada dos registros.

## Stack

- Linguagens: ["TypeScript"]
- Frameworks: ["Next.js 14 (App Router — fullstack: React Server Components no frontend + Route Handlers no backend)", "React Hook Form (validação de formulário no cliente)", "Zod (validação de schema compartilhada entre frontend e backend)"]
