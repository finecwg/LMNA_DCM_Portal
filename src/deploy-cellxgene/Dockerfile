FROM python:3.11-slim

# 기본 빌드 도구
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# cellxgene 및 의존성
RUN pip install --upgrade pip
RUN pip install --no-cache-dir cellxgene anndata scanpy h5py

# Cloud Run은 $PORT로 리스닝해야 함
ENV PORT=8080
EXPOSE 8080

# 성능/메모리 안정화 (과도한 쓰레딩 방지)
ENV OMP_NUM_THREADS=1
ENV MKL_NUM_THREADS=1
ENV OPENBLAS_NUM_THREADS=1
ENV NUMEXPR_NUM_THREADS=1

# GCS Fuse로 /data 마운트된다고 가정
# backed 모드(메모리 절약)와 함께 사용 권장
CMD ["bash","-lc","cellxgene launch /data/LMNA_snRNA_human_mouse_Atlas_annotated_DK_250710.h5ad --host 0.0.0.0 --port ${PORT} --backed"]

WORKDIR /app
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]