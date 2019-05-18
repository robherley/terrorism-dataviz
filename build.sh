#!/usr/bin/env bash

echo "Installing Backend Deps..."
npm i --prefix backend/
echo "Installing Frontend Deps..."
npm i --prefix frontend/
echo "Building Frontend.."
npm run build --prefix frontend/
echo "Moving Build.."
mv frontend/build backend/build