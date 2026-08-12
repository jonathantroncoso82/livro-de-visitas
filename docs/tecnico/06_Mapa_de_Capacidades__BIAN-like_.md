# Mapa de Capacidades — Livro de Visitas Digital

## Domínio: Gestão de Visitas

| Capacidade | Descrição | Componente Responsável |
|---|---|---|
| **Registro de Visita** | Captura e persiste dados do visitante | Route Handler POST + Supabase |
| **Validação de Dados** | Garante integridade dos campos obrigatórios e opcionais | Zod (cliente + servidor) |
| **Unicidade de Registro** | Impede duplicidade (email, visit_date) | Constraint UNIQUE + RLS |
| **Consulta de Registros** | Listagem paginada para admin | Route Handler GET + Supabase |
| **Autenticação Administrativa** | Controle de acesso à área restrita | Supabase Auth (JWT) |
| **Autorização por Papel** | Anon: INSERT; Auth: SELECT | RLS Policies (Supabase) |
| **Conformidade LGPD** | Coleta mínima, exclusão sob demanda, criptografia | Supabase (repouso) + TLS (trânsito) |
| **Imutabilidade de Registros** | Sem alteração ou exclusão pública | Ausência de PUT/PATCH/DELETE + RLS |

## Capacidades Fora do Escopo (v1)
- Relatórios analíticos e dashboards.
- Integração com CRM ou e-mail marketing.
- Exportação de dados (CSV/Excel).
- Notificações automáticas ao visitante.
