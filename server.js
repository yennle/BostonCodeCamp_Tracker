const express = require ('express');
const cors = require('cors');
const connectDB = require ('./config/db');


// Instantiate express
const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('API Running'));

// Initialize routes middleware

app.use('/api/speakers', require('./routes/api/speakers'));
app.use('/api/timeslots', require('./routes/api/timeslots'));
app.use('/api/rooms', require('./routes/api/rooms'));
app.use('/api/sessions', require('./routes/api/sessions'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));