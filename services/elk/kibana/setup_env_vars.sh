#!/bin/bash

set -e

VAULT_API_ADDR=http://vault:6988

echo "Waiting for Vault API to be healthy..."
until curl -s $VAULT_API_ADDR/health > /dev/null; do
    sleep 2
done

ENV_VARS=(SERVER_SSL_CERTIFICATE
SERVER_SSL_KEY
ELASTIC_PASSWORD)

KEYS=(services_crt
services_key
elasticsearch_pwd)

echo "Fetching Kibana secrets from Vault..."

vault_fetch() {
    local secret_name=$1
    local res=$(curl -s "$VAULT_API_ADDR/vault/getSecret" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$secret_name\"}"
    )
    local value=$(echo "$res" | jq -r '.message.value')
    echo "$value"
}

for i in "${!ENV_VARS[@]}"; do
    ENV_VAR=${ENV_VARS[$i]}
    KEY=${KEYS[$i]}
    VALUE=$(vault_fetch "$KEY")
    if [[ "$KEY" == "services_crt" || "$KEY" == "services_key" ]]; then
        FILE=/tmp/kibana_${KEY##*_}
        printf "%b" "${VALUE}" > "$FILE"
        VALUE="$FILE"
    fi
    export "$ENV_VAR=$VALUE"
    echo "Exported $ENV_VAR from Vault."
done

echo "Environment variables setup complete."