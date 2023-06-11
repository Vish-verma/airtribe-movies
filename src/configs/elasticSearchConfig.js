const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
  auth: { username: "dean", password: "winchester" },
});

const ingestData = async (data) => {
  try {
    console.log("starting ingestions...", data);
    for (const item of data) {
      await client.index({
        index: "movie_index",
        document: {...item},
      });
    }
    console.log("Data Ingested...");
    await client.indices.refresh({ index: 'movie_index' })
  } catch (error) {
    console.log("Data Ingestion Error: ", error);
  }
};

module.exports = {
  ingestData,
  client
};
