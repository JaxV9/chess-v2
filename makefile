run:
	npm run start

m ?= Auto-commit

c:
	git add .
	git commit -m "$(m)"
	git push