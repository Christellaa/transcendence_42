apiVersion: 1

datasources:
  - name: thanosQuery
    type: prometheus
    access: proxy
    url: http://thanosQuery:${THANOS_QUERY_PORT}
    isDefault: true
    version: 1
    editable: false