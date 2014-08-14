#!/bin/sh

cd /tmp

# try to remove the repo if it already exists
rm -rf keychain-nodejs; true

git clone https://github.com/anoochit/keychain-nodejs.git

cd keychain-nodejs

npm install

node .