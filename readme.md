# airtribe-Movies

The functionalities supported

1. Get All theatres
2. Get All Movies for a theatre on a particular date

---Updated Functionalities
3. Get All bookings
4. Get Available seats for a show
5. Book the show with seats for the user.

--Updated Functionalities 
6.  Cache added for quick retreival 
7.  GET API for comments | Ratings
8.  API to search for movies

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

3. Get All bookings :
<code>curl --location 'http://localhost:3000/api/booking' \
--header 'Content-Type: application/json'</code> 

4. Get Available seats for a show : 
<code>curl --location 'http://localhost:3000/api/booking/availableSeats/:showId' \
--header 'Content-Type: application/json'</code> 

5. Book the show with seats for the user. :
ORM Diagram for The DB: 
<code>curl --location 'http://localhost:3000/api/booking' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "123",
    "movieTheatreMappingId": 45,
    "seats": "D1,D2,D3",
}</code> 

6. Get all movies : 
<code>curl --location 'http://localhost:3000/api/movie/' \
--header 'Content-Type: application/json'</code> 

7. Get by movie ID : 
<code>curl --location 'http://localhost:3000/api/movie/:movieId' \
--header 'Content-Type: application/json'</code> 

8. Get by movie ID : 
<code>curl --location 'http://localhost:3000/api/movie/:movieId/ratings' \
--header 'Content-Type: application/json'</code> 

9. Search for movie with queryparams (search , language , genre , format) :
<code>curl --location 'http://localhost:3000/api/search?searchQuery=""&language=""&genre=""&format=""' \
--header 'Content-Type: application/json'</code> 


![ORM Screenshot](/public/image/ERD%20--%20SmartDraw%20-%20Google%20Chrome%2020-May-23%2011_20_34%20PM.png)


--Query Optimisations Added--
1. Cache Used for fast retrieval of data ( memcached).
2. Used indexs on the fields that are most used for searching.
3. Transactions used for retrieving data and adding booking with apt locks.