FROM python:3.9-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=api.settings.settings


WORKDIR /app

RUN mkdir -p /var/log/gunicorn

EXPOSE 8000

COPY requirements.txt setup.py run.sh ./
COPY api ./api
RUN pip install -r requirements.txt

ENTRYPOINT ["/bin/bash", "run.sh"]
