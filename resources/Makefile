export PATH := $(PATH):node_modules/.bin

SOURCES = \
	$(wildcard src/example/*) \
	webpack.config.js

all: build

build: clean node_modules $(SOURCES)
	webpack

watch: clean node_modules $(SOURCES)
	webpack-dev-server

clean:
	$(RM) -r theme

###

.PHONY: all build watch clean

node_modules: package.json
	npm install
	touch node_modules
