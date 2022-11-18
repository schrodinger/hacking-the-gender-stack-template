FROM python:3.8-slim-bullseye as bbchem

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

WORKDIR /app

RUN mkdir -p /var/log/gunicorn

EXPOSE 8000

COPY requirements.txt setup.py run.sh ./
RUN pip install -r requirements.txt

ENTRYPOINT ["/bin/bash", "run.sh"]
