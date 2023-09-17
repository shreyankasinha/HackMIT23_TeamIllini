const express = require('express');
const { connectDB } = require('./dboperations');
const app = express();
const PORT = 5005;

app.use(express.json());  // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Import and use your route handlers
const routeHandlers = require('./routeHandler');
app.use(routeHandlers);

connectDB()
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Could not connect to database", error);
    });