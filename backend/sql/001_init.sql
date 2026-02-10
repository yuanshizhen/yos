CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(64) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  role VARCHAR(32) NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, password_hash, role)
VALUES ('superadmin', 'ad89b64d66caa8e30e5d5ce4a9763f4ecc205814c412175f3e2c50027471426d', 'super_admin')
ON CONFLICT (username) DO NOTHING;
