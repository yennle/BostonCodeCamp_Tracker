const express = require ('express');
const connectDB = require ('./config/db');

// Instantiate express
const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json());


app.get('/', (req, res) => res.send('API Running'));



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));