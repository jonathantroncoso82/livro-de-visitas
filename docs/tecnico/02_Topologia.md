# Topologia de Implantação — Livro de Visitas Digital

```
┌─────────────────────────────────────────────────────────┐
│                        VERCEL CDN                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │          Next.js 14 App (Edge + Node.js)          │  │
│  │                                                   │  │
│  │  ┌─────────────────┐  ┌────────────────────────┐  │  │
│  │  │  React Server   │  │   Route Handlers       │  │  │
│  │  │  Components     │  │  /api/visits (POST)    │  │  │
│  │  │  / (público)    │  │  /api/visits (GET)     │  │  │
│  │  │  /admin (auth)  │  │  (protegido por Auth)  │  │  │
│  │  └─────────────────┘  └────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│         Secrets: SUPABASE_URL, SUPABASE_ANON_KEY,       │
│                  SUPABASE_SERVICE_ROLE_KEY               │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS / TLS
┌──────────────────────────▼──────────────────────────────┐
│                    SUPABASE (SaaS)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  PostgreSQL  │  │  Auth (JWT)  │  │  RLS Policies │  │  
│  │  visit_entries│  │  magic link  │  │  anon: INSERT │  │
│  │  + UNIQUE    │  │  email/senha │  │  auth: SELECT │  │
│  └──────────────┘  └──────────────┘  └───────────────┘  │
│         Criptografia em repouso nativa                   │
└─────────────────────────────────────────────────────────┘
```

**Zonas de Rede**
- Pública: rota `/` acessível sem autenticação.
- Privada: rota `/admin` + GET `/api/visits` exigem JWT válido.
- Banco: acessível apenas pelo backend Vercel via service role key.
