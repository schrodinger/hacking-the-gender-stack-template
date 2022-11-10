VIRTUAL_ENV := .backend-venv
SCRIPTS_DIR := "./scripts"

build:
	virtualenv ${VIRTUAL_ENV}
	$(VIRTUAL_ENV)/bin/pip install pip==21.3.1
	${VIRTUAL_ENV}/bin/pip install -r requirements.txt

run:
	. ${VIRTUAL_ENV}/bin/activate; bash ${SCRIPTS_DIR}/run.sh

shell:
	. ${VIRTUAL_ENV}/bin/activate; python manage.py shell

