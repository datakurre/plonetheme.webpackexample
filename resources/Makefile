LIB = lib/plonetheme.webpack/.git

all: build

build: clean node_modules $(LIB)
	node_modules/.bin/webpack

watch: clean node_modules $(LIB)
	PORT=8090 TARGET=watch node_modules/.bin/webpack-dev-server

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
