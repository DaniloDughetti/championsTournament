# championsTournament
NodeJS Rest API that enables client to organize soccer tournament 2.0


# Password
admin
champions
export DB_PASSWORD=champions

# Dependencies

npm i monogoose
npm i mongoose-dateonly // month/day/year && month - 1

# API tutorial

GET 
http://localhost:3000/api/players

GET 
http://localhost:3000/api/players/5b3bfecd9b7e6e0224908097


POST
http://localhost:3000/api/players

{
  "fiscalCode":"CRSRNL99G000K00",
  "name":"Cristiano",
  "surname":"Ronaldo",
  "shirtNumber":"7",
  "birthday":"01/28/1980"
}

CATCH
http://localhost:3000/api/players/5b3bfecd9b7e6e0224908097

[{
    "propName": "name",
    "value": "CRISTIANO"
},
{
    "propName": "surname",
    "value": "RONALDO"
}]

DELETE
http://localhost:3000/api/players/5b3bfecd9b7e6e0224908097
