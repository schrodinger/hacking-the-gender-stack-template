#!/bin/bash


set -xe

echo "Starting backend service..."
django-admin collectstatic
django-admin migrate

echo "launching gunicorn..."
gunicorn django_backend.django_backend.wsgi:application --pid ./gunicorn.pid --bind 0.0.0.0:8000
