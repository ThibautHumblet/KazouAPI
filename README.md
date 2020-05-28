# KazouAPI
De kazouAPI is een om de vakanties van monitoren weer te geven. Maar ze doet meer dan dat. Een beknopt overzicht hieronder.


## Wat doet de API?
De Kazou API is gemaakt om het boekingssysteem van vrijwilligers te voorzien. Er zijn 5 verschillende tabs. Hieronder een overzicht:
### Bestemmingen/Destinations
Hier worden de verschillende vakantiebestemmingen toegevoegd. Zowel de naam van het centrum, het land en de regio worden hier opgeslagen. Monitoren kunnen in deze controller ook een weerbericht van de verschillende vakanties ontvangen. Meer hierover in het puntje "3rd party API".
### Engagementen/Involvements
Alle verschillende tabellen worden hier gekoppeld. Een moni heeft een bepaalde functie op een bepaalde vakantie. Hier wordt dus als het ware de vrijwilligersboeking gedaan. Deze tab wordt ook beveiligd door een RouterGuard, zodat niet iedereen alle verschillende engagementen kan zien.
### Profielen/Profiles
Hier worden de verschillende vakantiefuncties bijgehouden.
### Vakanties/Vacations
Hier worden de verschillende vakanties gedefinieerd. Elke vakantie krijgt een naam, een bestemming (uit Destinations) een begindatum en een einddatum mee. In de Client kan men hier ook alle Paging, Filtering en Search acties uittesten.
### Vrijwilligers/Workers
Hier wordt elke vrijwilliger bijgehouden. Door de voornaam, achternaam, e-mailadres en verjaardag bij te houden, kan men zo een overzicht krijgen van wie er allemaal actief is bij Kazou. Ook deze tab wordt beveiligd door middel van een RouterGuard.

## CRUD
Elke controller is uitgerust met de volledige CRUD  bewerkingen + validatie. Deze bewerkingen worden gedaan door de verschillende http requests te sturen naar de desbetreffende controller.
Bv. 
```
POST https://kazouapi-1590156656031.ew.r.appspot.com/api/v1/workers/
{
  "firstName": "Firstname",
  "lastName": "Lastname",
  "emailAddress": "email@address.com",
  "birthDay": "19599-07-19T00:00:00"
}
```

Met andere woorden kan men op elke controller een POST, PUT, GET, GET/id en DELETE doen.

## 3rd Party API
Als 3rd party API heb ik gekozen voor de api van [Weatherstack](https://weatherstack.com/). Deze API staat me toe om met behulp van de regio van een bestemming, het huidige weerbercht van die regio te verkrijgen. Dit kan handig zijn voor een monitor die bijvoorbeeld wil checken hoe de gevoelstemperatuur is alvorens een waterspel te spelen. 

Om deze API aan te roepen, wordt er een GET call gedaan naar api.weatherstack.com:
```
GET http://api.weatherstack.com/current?access_key=APIKEY&query=LOCATION
```
Als response krijg ik, met als locatievoorbeeld Antwerpen:
```
{
  "request":
    {"type":"City","query":"Antwerpen, Belgium","language":"en","unit":"m"},
  "location":   
    {"name":"Antwerpen","country":"Belgium","region":"","lat":"51.217","lon":"4.417","timezone_id":"Europe\/Brussels","localtime":"2020-05- 28 15:09","localtime_epoch":1590678540,"utc_offset":"2.0"},
  "current":
    {"observation_time":"01:09 PM","temperature":20,"weather_code":113,"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0001_sunny.png"],"weather_descriptions":["Sunny"],"wind_speed":17,"wind_degree":70,"wind_dir":"ENE","pressure":1033,"precip":0,"humidity":32,"cloudcover":0,"feelslike":20,"uv_index":6,"visibility":10,"is_day":"yes"}
}
```

## Login via OAUTH2
Gebruikers kunnen zich inloggen door middel van OAUTH2. Hierdoor kunnen ze door met hun google-account in te loggen, toegang krijgen over de volledige website. Wanneer een gebruiker is ingelogd, kan deze ook zijn JWT opvragen door op de knop "Auth Response" te klikken. Wanneer een gebruiker ingelogd is, ziet hij ook in de header zijn profielfoto met naam staan.

## Wat werd er allemaal in het project toegepast?
- [x] Restful API met SQL database
- [x] CRUD op minstens één controller => alle controllers
- [x] Datamodel van minstens 3 klassen met minstens één "1-op-veel" en één "veel-op-veel' relatie
- [x] Een controller met paging, sorting en search
- [x] Minimum 5 ingebouwde validaties op de API 
- [x] Client applicatie die de API aanspreekt
- [x] Login mogelijk mbv. OAUTH2
- [ ] Beveiliging mbv. JWT => Ik kon de JWT wel verkrijgen, alleen ben ik niet geslaagd om deze mee te geven naar mijn API om zo beveiligde calls te doen. Daarom heb ik besloten deze er gewoon uit te laten. Als compromis heb ik wel gekozen om gebruik te maken van een RouterGuard. Zo is er wel beveiliging op de client application.
- [x] Gebruik maken van een 3rd party API
- [x] Deployment naar de cloud
