FROM python:3.11-slim

RUN pip install livereload

WORKDIR /app

COPY scripts/server.py .

EXPOSE 8080

CMD ["python", "server.py"]
