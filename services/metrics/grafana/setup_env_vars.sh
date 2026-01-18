#!/bin/bash

set -e

VAULT_API_ADDR=http://vault:6988

echo "Waiting for Vault API to be healthy..."
until curl -s $VAULT_API_ADDR/health > /dev/null; do
    echo "Vault API is not healthy yet. Retrying in 2 seconds..."
    sleep 2
done


ENV_VARS=(GF_SECURITY_ADMIN_USER
GF_SECURITY_ADMIN_PASSWORD
GF_SERVER_CERT_FILE
GF_SERVER_CERT_KEY
GF_USER_NAME
GF_USER_MAIL
GF_USER_LOGIN
GF_USER_PWD
)

KEYS=(gf_admin_user
gf_admin_pwd
services_crt
services_key
gf_user_name
gf_user_mail
gf_user_name
gf_user_pwd
)

echo "Fetching Grafana secrets from Vault..."

# local = la variable endpoint n'existe que dans la fonction
# $1 = 1er argument passé à la fonction
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
        FILE=/tmp/grafana_${KEY##*_}
        printf "%b" "${VALUE}" > "$FILE"
        VALUE="$FILE"
    fi
    export "$ENV_VAR=$VALUE"
    echo "Exported $ENV_VAR from Vault."
done

echo "Environment variables setup complete."