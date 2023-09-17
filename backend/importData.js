const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

client.connect(async err => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db("mydatabase");
  const collection = db.collection('questions');

  const data = JSON.parse(fs.readFileSync('./backend/data.json', 'utf8'));

  try {
    await collection.insertMany(data);
    console.log("Data imported successfully");
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
});
