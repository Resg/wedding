#!/bin/sh
set -e

echo "Running Prisma migrations..."
yarn prisma:migrate:deploy

echo "Starting app..."
exec yarn start
