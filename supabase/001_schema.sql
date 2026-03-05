-- ============================================================
-- Klimaportal Heinsberg  --  Schema & RLS
-- 001_schema.sql
-- ============================================================

-- ─── Helper: updated_at trigger function ────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── Helper: is_admin() ─────────────────────────────────────
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================
-- 1. admins
-- ============================================================
CREATE TABLE admins (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

CREATE TRIGGER admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_select_self" ON admins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "admins_all_admin" ON admins
  FOR ALL USING (is_admin());


-- ============================================================
-- 2. blog_posts
-- ============================================================
CREATE TABLE blog_posts (
  id                text PRIMARY KEY,
  date              text NOT NULL,
  author            text NOT NULL,
  author_role       text NOT NULL,
  tag               text NOT NULL,
  title             text NOT NULL,
  excerpt           text NOT NULL,
  read_time         text NOT NULL,
  color             text NOT NULL DEFAULT '#2d6a4f',
  image             text NOT NULL,
  paragraphs        text[] NOT NULL DEFAULT '{}',
  pull_quote        text NOT NULL DEFAULT '',
  pull_quote_author text NOT NULL DEFAULT '',
  display_order     integer NOT NULL DEFAULT 0,
  is_published      boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts_public_read" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "blog_posts_admin_insert" ON blog_posts
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "blog_posts_admin_update" ON blog_posts
  FOR UPDATE USING (is_admin());

CREATE POLICY "blog_posts_admin_delete" ON blog_posts
  FOR DELETE USING (is_admin());


-- ============================================================
-- 3. events
-- ============================================================
CREATE TABLE events (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  description text NOT NULL,
  date        text NOT NULL,
  end_date    text,
  location    text NOT NULL,
  category    text NOT NULL,
  image       text NOT NULL,
  link        text,
  heins_app      boolean NOT NULL DEFAULT false,
  display_order  integer NOT NULL DEFAULT 0,
  is_published   boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_public_read" ON events
  FOR SELECT USING (true);

CREATE POLICY "events_admin_insert" ON events
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "events_admin_update" ON events
  FOR UPDATE USING (is_admin());

CREATE POLICY "events_admin_delete" ON events
  FOR DELETE USING (is_admin());


-- ============================================================
-- 4. funding_programs
-- ============================================================
CREATE TABLE funding_programs (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  description text NOT NULL,
  amount      text NOT NULL,
  deadline    text NOT NULL,
  category    text NOT NULL,
  tag         text NOT NULL,
  color       text NOT NULL DEFAULT '#2d6a4f',
  bg_color    text NOT NULL DEFAULT '#f0f0ec',
  image          text NOT NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_published   boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER funding_programs_updated_at
  BEFORE UPDATE ON funding_programs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE funding_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "funding_programs_public_read" ON funding_programs
  FOR SELECT USING (true);

CREATE POLICY "funding_programs_admin_insert" ON funding_programs
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "funding_programs_admin_update" ON funding_programs
  FOR UPDATE USING (is_admin());

CREATE POLICY "funding_programs_admin_delete" ON funding_programs
  FOR DELETE USING (is_admin());


-- ============================================================
-- 5. projects
-- ============================================================
CREATE TABLE projects (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  description text NOT NULL,
  status      text NOT NULL CHECK (status IN ('laufend', 'abgeschlossen', 'geplant')),
  category    text NOT NULL,
  image       text NOT NULL,
  start_date  text NOT NULL,
  blog_id        text REFERENCES blog_posts(id) ON DELETE SET NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_published   boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects_public_read" ON projects
  FOR SELECT USING (true);

CREATE POLICY "projects_admin_insert" ON projects
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "projects_admin_update" ON projects
  FOR UPDATE USING (is_admin());

CREATE POLICY "projects_admin_delete" ON projects
  FOR DELETE USING (is_admin());


-- ============================================================
-- 6. charging_stations
-- ============================================================
CREATE TABLE charging_stations (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  address    text NOT NULL,
  lat        double precision NOT NULL,
  lng        double precision NOT NULL,
  type       text NOT NULL CHECK (type IN ('ac', 'dc', 'both')),
  power      text NOT NULL,
  connectors integer NOT NULL DEFAULT 1,
  operator   text NOT NULL,
  status     text NOT NULL CHECK (status IN ('active', 'planned', 'maintenance')),
  amenities  text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER charging_stations_updated_at
  BEFORE UPDATE ON charging_stations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE charging_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "charging_stations_public_read" ON charging_stations
  FOR SELECT USING (true);

CREATE POLICY "charging_stations_admin_insert" ON charging_stations
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "charging_stations_admin_update" ON charging_stations
  FOR UPDATE USING (is_admin());

CREATE POLICY "charging_stations_admin_delete" ON charging_stations
  FOR DELETE USING (is_admin());


-- ============================================================
-- 7. dashboard_metrics
-- ============================================================
CREATE TABLE dashboard_metrics (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  category    text NOT NULL,
  value       double precision NOT NULL,
  unit        text,
  prefix      text,
  net_change  text NOT NULL,
  net_label   text NOT NULL,
  subtitle    text NOT NULL,
  chart_data  jsonb NOT NULL DEFAULT '[]',
  chart_years jsonb NOT NULL DEFAULT '[]',
  pie_data    jsonb NOT NULL DEFAULT '[]',
  highlights  jsonb NOT NULL DEFAULT '[]',
  sources        text[] NOT NULL DEFAULT '{}',
  display_order  integer NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER dashboard_metrics_updated_at
  BEFORE UPDATE ON dashboard_metrics
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dashboard_metrics_public_read" ON dashboard_metrics
  FOR SELECT USING (true);

CREATE POLICY "dashboard_metrics_admin_insert" ON dashboard_metrics
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "dashboard_metrics_admin_update" ON dashboard_metrics
  FOR UPDATE USING (is_admin());

CREATE POLICY "dashboard_metrics_admin_delete" ON dashboard_metrics
  FOR DELETE USING (is_admin());


-- ============================================================
-- 8. metric_details  (article per dashboard_metric)
-- ============================================================
CREATE TABLE metric_details (
  id                text PRIMARY KEY,
  metric_id         text NOT NULL REFERENCES dashboard_metrics(id) ON DELETE CASCADE,
  headline          text NOT NULL,
  lead              text NOT NULL,
  paragraphs        text[] NOT NULL DEFAULT '{}',
  pull_quote        text NOT NULL DEFAULT '',
  pull_quote_author text NOT NULL DEFAULT '',
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (metric_id)
);

CREATE TRIGGER metric_details_updated_at
  BEFORE UPDATE ON metric_details
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE metric_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "metric_details_public_read" ON metric_details
  FOR SELECT USING (true);

CREATE POLICY "metric_details_admin_insert" ON metric_details
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "metric_details_admin_update" ON metric_details
  FOR UPDATE USING (is_admin());

CREATE POLICY "metric_details_admin_delete" ON metric_details
  FOR DELETE USING (is_admin());


-- ============================================================
-- 9. tips
-- ============================================================
CREATE TABLE tips (
  id         serial PRIMARY KEY,
  icon_key   text NOT NULL,
  title      text NOT NULL,
  front_text text NOT NULL,
  savings    text NOT NULL,
  image      text NOT NULL,
  stats      jsonb NOT NULL DEFAULT '[]',
  details    text[] NOT NULL DEFAULT '{}',
  fact           text NOT NULL DEFAULT '',
  display_order  integer NOT NULL DEFAULT 0,
  is_published   boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER tips_updated_at
  BEFORE UPDATE ON tips
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tips_public_read" ON tips
  FOR SELECT USING (true);

CREATE POLICY "tips_admin_insert" ON tips
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "tips_admin_update" ON tips
  FOR UPDATE USING (is_admin());

CREATE POLICY "tips_admin_delete" ON tips
  FOR DELETE USING (is_admin());


-- ============================================================
-- 10. milestones
-- ============================================================
CREATE TABLE milestones (
  id          serial PRIMARY KEY,
  year        text NOT NULL,
  title       text NOT NULL,
  description text NOT NULL,
  status      text NOT NULL CHECK (status IN ('done', 'active', 'future')),
  color          text NOT NULL DEFAULT '#2d6a4f',
  display_order  integer NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "milestones_public_read" ON milestones
  FOR SELECT USING (true);

CREATE POLICY "milestones_admin_insert" ON milestones
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "milestones_admin_update" ON milestones
  FOR UPDATE USING (is_admin());

CREATE POLICY "milestones_admin_delete" ON milestones
  FOR DELETE USING (is_admin());


-- ============================================================
-- 11. facts
-- ============================================================
CREATE TABLE facts (
  id             serial PRIMARY KEY,
  content        text NOT NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_active      boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER facts_updated_at
  BEFORE UPDATE ON facts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE facts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "facts_public_read" ON facts
  FOR SELECT USING (true);

CREATE POLICY "facts_admin_insert" ON facts
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "facts_admin_update" ON facts
  FOR UPDATE USING (is_admin());

CREATE POLICY "facts_admin_delete" ON facts
  FOR DELETE USING (is_admin());
