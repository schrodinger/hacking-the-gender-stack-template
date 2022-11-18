# setup.py definition for the bluebird-spinner package
# used to distribute and roll python eggs

from setuptools import find_packages
from setuptools import setup

install_reqs = [
    "Django==4.1", "djangorestframework==3.11.0", "drf-spectacular==0.23.1",
    "setuptools==65.3.0", "gunicorn==19.6.0"
]

setup(
    name="hackathon-be",
    description="hackathon backend service",
    packages=find_packages(),
    python_requires=">=3.0",
    install_requires=install_reqs,
)
