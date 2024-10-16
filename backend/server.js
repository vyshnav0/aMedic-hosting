
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path'); // Import path module


const app = express();
const PORT = process.env.PORT || 3000;
const db_url = process.env.DATABASE_URL

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // cors middleware
mongoose.connect(db_url)
    .then(()=> console.log("mongodb connected"))
    .catch(err => console.error("mongodb conn error"))
 
const usersRoute = require('./routes/usersRoute')
app.use('/users', usersRoute);     //middleware for userRoute

const productRoute = require('./routes/productRoute')
app.use('/products', productRoute);

const orderHistoryRoute = require('./routes/orderHistoryRoute');
app.use('/history', orderHistoryRoute);


// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

// Handle all GET requests and return the index.html file for Angular routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
});

app.get('/', (req, res)=>{
    res.send("backend");
});
app.listen(PORT, ()=>{
    console.log("Server is up");
    
})