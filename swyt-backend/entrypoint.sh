#!/bin/bash

# Run your seed command
echo "Running seed command..."
npx prisma db seed

# Start your application
echo "Starting application..."
npm run start:prod
