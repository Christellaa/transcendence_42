#!/bin/bash

set -e

VAULT_API_ADDR=http://vault:6988

echo "Waiting for Vault API to be healthy..."
until curl -s $VAULT_API_ADDR/health > /dev/null; do
    echo "Vault API is not healthy yet. Retrying in 2 seconds..."
    sleep 2
done

echo "Fetching Logstash secrets from Vault..."

vault_fetch() {
    local secret_name=$1
    local res=$(curl -s "$VAULT_API_ADDR/vault/getSecret" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$secret_name\"}"
    )
    local value=$(echo "$res" | jq -r '.message.value')
    echo "$value"
}

ELASTIC_PASSWORD=$(vault_fetch "elasticsearch_pwd")
export "ELASTIC_PASSWORD=$ELASTIC_PASSWORD"

echo "Exported ELASTIC_PASSWORD from Vault."
echo "Environment variables setup complete."