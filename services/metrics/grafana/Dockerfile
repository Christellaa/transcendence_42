FROM grafana/grafana:12.2

WORKDIR /app/services/grafana

USER root

RUN apk add jq

COPY ./entrypoint.sh .
COPY ./setup_env_vars.sh .
RUN chmod +x ./entrypoint.sh

USER grafana

ENTRYPOINT ["./entrypoint.sh"]