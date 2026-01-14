#!/bin/sh

set -e

echo "Generating .env file from .env.tpl"
cp .env.tpl .env

PASSPHRASE="abcde"
LOGS_PATH="./logs"
GRAFANA_ADMIN_USER="adminuser"
GRAFANA_ADMIN_PWD="adminpwd"
GRAFANA_USER_NAME="grafanauser"
GRAFANA_USER_MAIL="grafanauser@example.com"
GRAFANA_USER_PWD="grafanauserpwd"
MINIO_ROOT_USER="minioroot"
MINIO_ROOT_PASSWORD="miniorootpwd"
ELASTICSEARCH_PWD="elasticpwd"

echo "Filling in the placeholders in .env file"
sed -i "s|^\(PASSPHRASE=\).*|\1${PASSPHRASE}|" .env
sed -i "s|^\(LOGS_PATH=\).*|\1${LOGS_PATH}|" .env
sed -i "s|^\(GRAFANA_ADMIN_USER=\).*|\1${GRAFANA_ADMIN_USER}|" .env
sed -i "s|^\(GRAFANA_ADMIN_PWD=\).*|\1${GRAFANA_ADMIN_PWD}|" .env
sed -i "s|^\(GRAFANA_USER_NAME=\).*|\1${GRAFANA_USER_NAME}|" .env
sed -i "s|^\(GRAFANA_USER_MAIL=\).*|\1${GRAFANA_USER_MAIL}|" .env
sed -i "s|^\(GRAFANA_USER_PWD=\).*|\1${GRAFANA_USER_PWD}|" .env
sed -i "s|^\(MINIO_ROOT_USER=\).*|\1${MINIO_ROOT_USER}|" .env
sed -i "s|^\(MINIO_ROOT_PASSWORD=\).*|\1${MINIO_ROOT_PASSWORD}|" .env
sed -i "s|^\(ELASTICSEARCH_PWD=\).*|\1${ELASTICSEARCH_PWD}|" .env

echo "Setting up Ethereal email account"
./setup_ethereal.sh

echo "Environment file .env generated successfully."