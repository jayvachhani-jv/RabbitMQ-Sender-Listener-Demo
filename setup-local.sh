#!/bin/bash

echo "Setting up RabbitMQ Sender/Listener Demo for Local Development..."
echo

echo "1. Installing dependencies..."
npm install

echo
echo "2. Starting RabbitMQ in Docker..."
npm run docker:rabbitmq

echo
echo "3. Waiting for RabbitMQ to be ready..."
sleep 15

echo
echo "4. Testing connection..."
npm run test:local

echo
echo "Setup complete! You can now run:"
echo "  npm run start:local     - Run both sender and listener"
echo "  npm run start:sender:local   - Run only sender"
echo "  npm run start:listener:local - Run only listener"
echo 