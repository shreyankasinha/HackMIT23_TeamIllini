const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";

let db;

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db("mydatabase");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Could not connect to database", error);
    }
}

async function addQuestion(question) {
    try {
        const collection = db.collection('questions');
        await collection.insertOne(question);
    } catch (error) {
        console.error("Could not add question", error);
    }
}

async function deleteQuestion(questionId) {
    try {
        const collection = db.collection('questions');
        await collection.deleteOne({ _id: questionId });
    } catch (error) {
        console.error("Could not delete question", error);
    }
}

async function updateQuestion(questionId, updates) {
    try {
        const collection = db.collection('questions');
        await collection.updateOne({ _id: questionId }, { $set: updates });
    } catch (error) {
        console.error("Could not update question", error);
    }
}

async function getQuestion(questionId) {
    try {
        const collection = db.collection('questions');
        const question = await collection.findOne({ _id: questionId });
        return question;
    } catch (error) {
        console.error("Could not get question", error);
    }
}

function getQuestionsByDifficulty(db, callback) {
    const collection = db.collection('questions');
    collection.find({}).toArray(callback);
}

module.exports = {
    connectDB,
    addQuestion,
    getQuestion,
    getQuestionsByDifficulty, 
    deleteQuestion,
    updateQuestion
};
