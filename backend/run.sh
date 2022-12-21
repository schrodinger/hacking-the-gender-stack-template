#!/bin/bash

set -xe

export DJANGO_SETTINGS_MODULE="api.settings.settings"

echo "Starting backend service..."
django-admin migrate --noinput

django-admin runserver
