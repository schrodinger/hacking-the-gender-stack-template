FROM python:3.9-slim-bullseye as bbchem

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1


WORKDIR /app

RUN mkdir -p /var/log/gunicorn

EXPOSE 8000

COPY requirements.txt setup.py run.sh ./
#RUN #pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

ENTRYPOINT ["/bin/bash", "run.sh"]
