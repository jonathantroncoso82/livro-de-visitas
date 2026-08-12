# Terraform / IaC — Livro de Visitas Digital

> **Nota**: Vercel e Supabase são SaaS gerenciados. O IaC abaixo provisiona os recursos via providers oficiais Terraform.

```hcl
terraform {
  required_version = ">= 1.6"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

# --- Supabase Project ---
resource "supabase_project" "museu" {
  name            = "livro-visitas-museu"
  organization_id = var.supabase_org_id
  region          = "sa-east-1"
  database_password = var.db_password
}

# --- Tabela visit_entries (via SQL migration) ---
resource "supabase_migration" "visit_entries" {
  project_ref = supabase_project.museu.id
  version     = "20240101000000"
  sql = <<-SQL
    CREATE TABLE IF NOT EXISTS visit_entries (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name  TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      visit_date DATE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT uq_email_date UNIQUE (email, visit_date)
    );
    ALTER TABLE visit_entries ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "anon_insert" ON visit_entries
      FOR INSERT TO anon WITH CHECK (true);
    CREATE POLICY "auth_select" ON visit_entries
      FOR SELECT TO authenticated USING (true);
  SQL
}

# --- Vercel Project ---
resource "vercel_project" "livro_visitas" {
  name      = "livro-visitas-museu"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

# --- Vercel Environment Variables (Secrets) ---
resource "vercel_project_environment_variable" "supabase_url" {
  project_id = vercel_project.livro_visitas.id
  key        = "NEXT_PUBLIC_SUPABASE_URL"
  value      = supabase_project.museu.api_url
  target     = ["production", "preview"]
}

resource "vercel_project_environment_variable" "supabase_anon" {
  project_id = vercel_project.livro_visitas.id
  key        = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  value      = var.supabase_anon_key
  target     = ["production", "preview"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "supabase_service" {
  project_id = vercel_project.livro_visitas.id
  key        = "SUPABASE_SERVICE_ROLE_KEY"
  value      = var.supabase_service_role_key
  target     = ["production"]
  sensitive  = true
}

# --- Vercel Deployment ---
resource "vercel_deployment" "prod" {
  project_id = vercel_project.livro_visitas.id
  ref        = "main"
  production = true
}
```

**Variáveis necessárias**: `supabase_org_id`, `db_password`, `github_repo`, `supabase_anon_key`, `supabase_service_role_key`.
