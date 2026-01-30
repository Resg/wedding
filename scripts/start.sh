#!/bin/sh
set -e

if [ -f "/app/.env" ] && [ -z "${DATABASE_URL:-}" ]; then
  # Load env vars for runtime (Prisma expects DATABASE_URL in process env)
  set -a
  . /app/.env
  set +a
fi

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Running Prisma migrations..."
  yarn prisma:migrate:deploy
else
  echo "DATABASE_URL is not set; skipping Prisma migrations."
fi

echo "Starting app..."
exec yarn start
