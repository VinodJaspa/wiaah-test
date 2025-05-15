#!/bin/bash

services=(
  auth
  accounts
  products
  reviews
  search
  services
  chat
  mailing
  moderation
  membership
  billing
shopping-cart
  affiliation
  social
  orders
  hashtag
  currency_conversaion
)

for service in "${services[@]}"; do
  osascript <<EOF
tell application "Terminal"
  do script "cd $(pwd) && pnpm --filter $service start:dev"
end tell
EOF
  sleep 1
done
