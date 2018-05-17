.PHONY: clean, all

all: docs/index.html docs/index.css docs/index.js

docs/index.js: src/*.js
		cp src/index.js docs/index.js

docs/index.html: src/*.pug
		pug src/index.pug -Po docs

docs/index.css: src/*.scss
		sass src/index.scss docs/index.css

clean:
		rm docs/*
