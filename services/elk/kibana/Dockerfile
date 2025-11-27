FROM docker.elastic.co/kibana/kibana:8.15.0

USER root
RUN apt-get update && apt-get install -y jq
COPY import_dashboards.sh /usr/local/bin/import_dashboards.sh
RUN chmod +x /usr/local/bin/import_dashboards.sh
USER kibana
ENTRYPOINT ["/bin/bash", "-c", "/usr/local/bin/import_dashboards.sh & /usr/local/bin/kibana-docker"]