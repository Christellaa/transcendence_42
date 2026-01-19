#!/bin/bash

set -e

echo "Setting up environment variables..."
source ./setup_env_vars.sh

echo "Starting Elasticsearch..."
exec elasticsearch