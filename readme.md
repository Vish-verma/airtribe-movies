# airtribe-Movies

The functionalities supported

1. Get All theatres
2. Get All Movies for a theatre on a particular date

packages to be installed

express sequelize express

Commands to be run

Installing the packages - <strong>npm install</strong>

Starting the server - <strong>npm start</strong>

The Curls to see the functionalities

1. Get All theatres : 
<code>curl --location 'http://localhost:3000/api/theatre' \
--header 'Content-Type: application/json'</code> 
    
2. Get All Movies for a theatre on a particular date :  <code>curl --location 'http://localhost:3000/api/theatre/1?date=2023-05-04' \
--header 'Content-Type: application/json'</code> 

