FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.0

USER root

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
COPY setup_env_vars.sh .

USER elasticsearch
ENTRYPOINT ["./entrypoint.sh"]