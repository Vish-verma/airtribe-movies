
const getSearchQuery = (searchQuery , language, genre, format)=>{
    

    const esQuery = {
        // "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "name": searchQuery
                }
              },
              {
                "match": {
                  "plot": searchQuery
                }
              },
              {
                "match": {
                  "cast": searchQuery
                }
              }
            ],
          }
        // }
      }
    if(language || genre || format){
        esQuery.bool.filter=[];

        if(language){
            esQuery.bool.filter.push({
                "term": {
                  "language": language
                }
              })
        }
        if(genre){
            esQuery.bool.filter.push({
                "term": {
                  "genre": genre
                }
              })
        }
        if(format){
            esQuery.bool.filter.push({
                "term": {
                  "type": format
                }
              })
        }
    }
    return esQuery;
}

module.exports = {
    getSearchQuery,
}