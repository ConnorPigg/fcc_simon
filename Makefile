.PHONY: clean, all

all: build/index.html build/index.css build/index.js

build/index.js: src/index.js
		cp src/index.js build/index.js

build/index.html: src/*.pug
		pug src -Po build

build/index.css: src/*.scss
		sass src/index.scss build/index.css

clean:
		rm build/*
