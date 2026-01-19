FROM docker.elastic.co/kibana/kibana:8.15.0

USER root

WORKDIR /app/services/kibana

RUN apt-get update && apt-get install -y jq

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
COPY setup_env_vars.sh .
COPY import_dashboards.sh .

USER kibana

ENTRYPOINT ["./entrypoint.sh"]