export PATH := $(PATH):node_modules/.bin

LIB = lib/plonetheme.webpack/.git
WEBPACK_SOURCES = $(wildcard theme/*) webpack.config.js

all: build

build: clean node_modules $(LIB) $(SOURCES)
	webpack

watch: clean node_modules $(LIB) $(SOURCES)
	PORT=8090 TARGET=watch webpack-dev-server

clean:
	rm -rf theme

lib:
	git submodule update --init --recursive
	git submodule update --remote --

###

.PHONY: all build watch clean lib

$(LIB):
	git submodule update --init --recursive
	git submodule update --remote --

node_modules: package.json
	npm install
	touch node_modules
