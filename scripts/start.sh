#!/bin/sh
set -e

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Running Prisma migrations..."
  yarn prisma:migrate:deploy
else
  echo "DATABASE_URL is not set; skipping Prisma migrations."
fi

echo "Starting app..."
exec yarn start
