FROM docker.elastic.co/logstash/logstash:8.15.0

USER root

RUN  apt-get update && \
    apt-get install -y jq
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
COPY setup_env_vars.sh .

USER logstash
ENTRYPOINT ["./entrypoint.sh"]