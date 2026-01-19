server.name: kibana
server.host: 0.0.0.0
server.publicBaseUrl: https://localhost:5601

elasticsearch.hosts: ["http://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
elasticsearch.username: ${ELASTICSEARCH_USER}

server.ssl.enabled: true

xpack.monitoring.ui.container.elasticsearch.enabled: true