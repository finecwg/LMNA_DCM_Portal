#!/bin/bash
set -euo pipefail

echo "[INFO] PORT=${PORT}"
echo "[INFO] Listing /data ..."
ls -lah /data || true

H5="/data/LMNA_snRNA_human_mouse_Atlas_annotated_DK_250710.h5ad"
if [ ! -f "$H5" ]; then
  echo "[ERROR] H5AD not found at $H5"
  echo "[HINT] --add-volume 의 bucket 이름과 --add-volume-mount 의 mount-path=/data 확인,"
  echo "       버킷에 파일이 실제 있는지(gsutil ls -l gs://your-cellxgene-bucket/),"
  echo "       Cloud Run 서비스계정의 roles/storage.objectViewer 권한 확인."
  sleep 5
  exit 1
fi

echo "[INFO] Starting cellxgene..."
exec cellxgene launch "$H5" \
  --host 0.0.0.0 \
  --port "${PORT}" \
  --disable-keys \
  --backed \
  --no-browser
