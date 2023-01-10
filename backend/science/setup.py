# setup.py definition for the bluebird-spinner package
# used to distribute and roll python eggs

from setuptools import find_packages
from setuptools import setup

install_reqs = [
    "rdkit",
]

setup(
    name="hackathon-science",
    description="hackathon science service",
    packages=find_packages(),
    python_requires=">=3.0",
    install_requires=install_reqs,
)
