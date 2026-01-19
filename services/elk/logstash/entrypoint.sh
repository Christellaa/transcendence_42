#!/bin/bash

set -e

echo "Setting up environment variables..."
source ./setup_env_vars.sh

echo "Configuring Logstash with fetched secrets..."
PIPELINE="/usr/share/logstash/pipeline/logstash.conf"
TMP_PIPELINE="/usr/share/logstash/pipeline/logstash_tmp.conf"
cp $PIPELINE $TMP_PIPELINE
sed -i "s|_ELASTIC_PASSWORD_|${ELASTIC_PASSWORD}|g" $TMP_PIPELINE

echo "Waiting for Elasticsearch to be healthy..."
ELASTICSEARCH_HEALTH_URL=http://elasticsearch:9200/_cluster/health
until curl -s $ELASTICSEARCH_HEALTH_URL > /dev/null; do
    sleep 2
done

echo "Starting Logstash..."
exec logstash -f $TMP_PIPELINE