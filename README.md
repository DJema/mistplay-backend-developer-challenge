# mistplay-backend-developer-challenge

API ENDPOINT: http://localhost:3000/games/search

Request Body: {
  query : String,
  page : Number,
  }

The post request takes as input the current text in the searchbox and the page (index). Returns a result that uses fuzzy string
matching to calculate the similarity score between the query and the results.

Here is an example request.


![Alt text](postman_example.png?raw=true "Example of search request")