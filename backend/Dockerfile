FROM python:3.9-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=django_backend.settings


WORKDIR /app

RUN mkdir -p /var/log/gunicorn

EXPOSE 8000

COPY requirements.txt setup.py run.sh ./
COPY django_backend ./
RUN pip3 install -r requirements.txt

ENTRYPOINT ["/bin/bash", "run.sh"]
