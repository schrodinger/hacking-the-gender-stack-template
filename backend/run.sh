#!/bin/bash


set -xe

echo "Starting backend service..."
django-admin migrate --noinput

echo "launching gunicorn..."
gunicorn django_backend.wsgi:application --pid ./gunicorn.pid --bind 0.0.0.0:8000
