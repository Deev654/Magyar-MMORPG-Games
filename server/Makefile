.PHONY: install lint format format-check test

PYTHON ?= python3

install:
	$(PYTHON) -m pip install --upgrade pip
	$(PYTHON) -m pip install -r requirements-dev.txt

lint:
	ruff check src tests

format:
	black src tests

format-check:
	black --check src tests

test:
	pytest
