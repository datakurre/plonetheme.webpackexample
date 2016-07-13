BUILDOUT_BIN ?= $(shell command -v buildout || echo 'bin/buildout')
BUILDOUT_ARGS ?=

all: build

build: clean resources/theme

clean:
	rm -rf .installed.cfg bin develop-eggs parts resources/theme

###

.PHONY: all build clean

bootstrap-buildout.py:
	curl -k -O https://bootstrap.pypa.io/bootstrap-buildout.py

bin/buildout: bootstrap-buildout.py buildout.cfg
	python bootstrap-buildout.py -c buildout.cfg

bin/instance: $(BUILDOUT_BIN) buildout.cfg
	$(BUILDOUT_BIN) -N $(BUILDOUT_ARGS) install instance

resources/theme: bin/instance resources/Makefile
	bin/instance start
	make -C resources build
	bin/instance stop

