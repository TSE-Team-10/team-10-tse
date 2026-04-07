# Docker (undated) https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/

from python:3.11-slim

WORKDIR /app

COPY app/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000",]