#!/bin/bash

set -xe

export PYTHONDONTWRITEBYTECODE=1
export DJANGO_SETTINGS_MODULE="api.settings.settings"

echo "Starting backend service..."
django-admin makemigrations api
django-admin migrate --noinput
django-admin runserver
