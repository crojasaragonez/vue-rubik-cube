#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# skip Jekyll so Vite asset paths are served as-is
touch .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# discard any previous deploy repo (dist/ is gitignored)
rm -rf .git
git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:crojasaragonez/vue-rubik-cube.git HEAD:gh-pages

cd -
