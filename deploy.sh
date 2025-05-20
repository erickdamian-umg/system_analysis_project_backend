#!/bin/bash

# Install dependencies
npm install

# Create production build
npm run build

# Initialize EB CLI if not already done
eb init crm-backend --platform node.js --region us-east-1

# Create environment if it doesn't exist
eb create production --instance-type t2.micro --single

# Deploy the application
eb deploy 