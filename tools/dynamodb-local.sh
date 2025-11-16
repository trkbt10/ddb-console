#!/bin/bash
set -e

# Change to the tools directory
cd "$(dirname "$0")"

# Setup DynamoDB Local if not installed
if [ ! -d ./dynamodb ]; then
  echo "Setting up DynamoDB Local..."
  mkdir -p dynamodb
  cd dynamodb

  echo "Downloading DynamoDB Local..."
  wget https://s3.ap-south-1.amazonaws.com/dynamodb-local-mumbai/dynamodb_local_latest.tar.gz -O dynamodb.tar.gz

  echo "Extracting DynamoDB Local..."
  tar -xzf dynamodb.tar.gz -C .
  rm dynamodb.tar.gz

  echo "DynamoDB Local setup completed successfully!"
  cd ..
else
  echo "DynamoDB Local is already installed"
fi

# Start DynamoDB Local
cd dynamodb
echo "Starting DynamoDB Local on http://localhost:8000..."
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
