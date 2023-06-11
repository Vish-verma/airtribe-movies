const { client } = require("../configs/elasticSearchConfig")
const { getSearchQuery } = require("../helper/queryGenerator")

const searchMovie = async (req,res)=>{
    try {
        let {searchQuery , language, genre, format } = req.query
        // client
        let esQuery = getSearchQuery(searchQuery , language, genre, format);
        const result= await client.search({
            index: 'movie_index',
            query: esQuery
          })
          if(result){
            res.status(200).json({ results: result.hits.hits });

          }else{
            return res.status(404).json({ message: "No Result Found" });
          }
        
        //   console.log(result.hits.hits)
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
}

module.exports = {
    searchMovie
}