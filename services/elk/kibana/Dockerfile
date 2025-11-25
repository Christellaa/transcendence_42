FROM docker.elastic.co/kibana/kibana:8.15.0

USER root
RUN apt-get update && apt-get install -y jq

USER kibana
ENTRYPOINT ["/usr/local/bin/kibana-docker"]