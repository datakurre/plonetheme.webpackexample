BUILDOUT_BIN ?= $(shell command -v buildout || echo 'bin/buildout')
BUILDOUT_ARGS ?=

all: build

build: bin/instance resources/theme

clean:
	rm -rf .installed.cfg bin develop-eggs parts test.py resources/theme

###

.PHONY: all build clean

bootstrap-buildout.py:
	curl -k -O https://bootstrap.pypa.io/bootstrap-buildout.py

bin/buildout: bootstrap-buildout.py buildout.cfg
	python bootstrap-buildout.py -c buildout.cfg

bin/instance: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N $(BUILDOUT_ARGS) install instance

resources/theme: resources/Makefile
	make -C resources build

