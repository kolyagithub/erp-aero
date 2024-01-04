# erp-aero
Sample test project 

## Install
``
npm install
``

## Prepare ENV
``
cp .env.example .env
``

## Run
``
npm start
``
``
npm run start:watch
``


## API Documentation

#### Signup

``
curl --location 'localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data '{
"login": "Peter",
"password": "12345"
}'
``

#### Signin

``
curl --location 'localhost:3000/signin' \
--header 'Content-Type: application/json' \
--data '{
"login": "Peter",
"password": "12345"
}'
``

#### Refresh token

``
curl --location 'localhost:3000/signin/new_token' \
--header 'Content-Type: application/json' \
--data '{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1lbiIsImlhdCI6MTY5OTYzOTE5NSwiZXhwIjoxNjk5NzI1NTk1fQ.J-ByV9nONyj-87T2IbcfZwDMHUIlZ774u3oebEzjdPQ"
}'
``