type: S3
config:
  bucket: thanos
  endpoint: minio:9000
  access_key: ${MINIO_ROOT_USER}
  secret_key: ${MINIO_ROOT_PASSWORD}
  insecure: true