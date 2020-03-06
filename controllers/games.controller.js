const FuzzySet = require('fuzzyset.js');

// Controller for test endpoint
exports.test = function (req, res) {
  res.send('Server up & running!');
};

/*
Controller for search function. The request body contains the current string in the search bar. The page (index) depends on whether the user 
scrolled down and more results are therefore requested.

Request Body: {
  query : String,
  page : Number,
  }

This implementation assumes 10 results per page. So each index has 10 results.

*/
exports.search = function(req, res){
  let query = req.body.query;
  let page = req.body.page;

  // For the purpose of this implementation, the data is drawn directly from the local directlry.
  let data = require('../games.json');
  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    // If the name matches within the default threshold, then add the game and its similarity score to the resulting list.
    let fuzzy_titles = FuzzySet();
    fuzzy_titles.add(data[i].title);

    if(fuzzy_titles.get(query)){

      let dataWithSimilarityScore = data[i];
      dataWithSimilarityScore["SimilarityScore"] = fuzzy_titles.get(query)[0][0];
      filteredData.push(dataWithSimilarityScore);
    }
  }

  //Comparer Function for sorting the results by similarity score, then by rating count.
  function GetSortOrder(similarityScore, ratingCount) {  
    return function(a, b) { 
      
        // If the values are similar, display the more popular games first
        if(Math.abs(a[similarityScore] - b[similarityScore]) <= 0.05){
          if (a[ratingCount] > b[ratingCount]) {  
            return -1;  
          } else if (a[ratingCount] < b[ratingCount]) {  
            return 1;  
          }  
        }
        // If the similarity scores are different enough, then display the highest similarity score.
        if (a[similarityScore] > b[similarityScore]) {  
          return -1;  
        } else if (a[similarityScore] < b[similarityScore]) {  
          return 1;  
        }  
        return 0;  
      }  
  }
  // Sort according to comparer function
  filteredData.sort(GetSortOrder("SimilarityScore", "rCount"));

  // Assuming 10 objects per page, list the apropriate results as we scroll down on the page to get more results.
  let filteredDataByPage = [];
  for(let i = (page - 1) * 10; i < page * 10; i++){
    if(i >= filteredData.length){
      break;
    } else {
      filteredDataByPage.push(filteredData[i]);
    } 
  }
  res.send(filteredDataByPage);
}