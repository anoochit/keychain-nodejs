Keychain Server
==============

Clone this repository

    git clone https://github.com/anoochit/keychain-nodejs.git

Install requirement package

    cd keychain-nodejs
    npm install
    
Start MongoDB and start server

    node .
    
Service run on port 8080


Service Endpoint
----------------

Service endpoint = http://your-server:8080/api

Get Public Key
--------

Request | Resource | Params | Description
---------|---------|---------- | ------------- 
POST | /keys | email, key | Add new public key
PUT | /keys/:email | email, key | Update public key that belongs to email
DELELET | /keys/:email | email, key | Delete public key that belongs to email
GET | /keys/:email | - | Return public key that belongs to email



