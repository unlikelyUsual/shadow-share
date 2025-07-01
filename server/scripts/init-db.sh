#!/bin/bash
set -e

# export POSTGRES_HOST="localhost" 
# export POSTGRES_USER="root"
# export POSTGRES_PASSWORD="root"
# export POSTGRES_DB="db" 

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is up - executing database initialization"

# Set PGPASSWORD for pg_isready and other PostgreSQL commands
export PGPASSWORD=$POSTGRES_PASSWORD

# Test database connection
echo "Testing database connection..."
psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT 1;" > /dev/null

# Generate Drizzle migrations (if not already generated)
echo "Generating Drizzle migrations..."
if [ ! -d "./drizzle" ] || [ -z "$(ls -A ./drizzle)" ]; then
  npm run drizzle:generate
else
  echo "Migrations already exist, skipping generation..."
fi

# Push migrations to database
echo "Pushing migrations to database..."
npm run drizzle:push

# Check if data already exists to avoid duplicate seeding
echo "Checking if database is already seeded..."
EXISTING_USERS=$(psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -t -c "SELECT COUNT(*) FROM \"UserTable\";" 2>/dev/null || echo "0")

if [ "$EXISTING_USERS" -eq "0" ]; then
  echo "Database is empty, running seed script..."
  npm run seed
else
  echo "Database already contains data, skipping seeding..."
fi

echo "Database initialization completed successfully!"
