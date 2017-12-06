# Watson Chat

## System requirements

    Node installed v6.0.0+ 
    config.json

## Install

    npm install

## Configuration ( IMPORTANT )

    Do NOT forget to copy config.json to / folder of this project. ( Same path as app.js , package.json ...).
    Instructions to create on below.

## Create Config.json

    Find your Watson's creadentials inside your dashboard.
    Watson Dashboard -> Deploy -> Credentials

    config.json should be like this: 

    {
        "username":"<YOUR_USERNAME>",
        "password":"<YOUR_PASSWORD>",
        "version":"v1",
        "version_date":"2017-05-26",
        "workspace_id":"<YOUR_WORKSPACE_ID>"
    }

## Start App

    node app.js

## Link

    Application will be available here: http://localhost:5000/