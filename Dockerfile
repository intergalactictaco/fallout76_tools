FROM python:3.11-slim

WORKDIR /app

COPY scripts/server.py .

COPY scripts/requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "server.py"]
