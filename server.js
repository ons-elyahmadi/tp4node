const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const ProductRoutes =require('./routes/productRoutes')
const CategoryRoutes =require('./routes/categoryRoutes')
 
dotenv.config()
const app = express();
 
 
const ejs = require('ejs');
const path = require('path');
 
 
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
 //db.js

 

// Remplacez `Connection String` par la chaîne de connexion MongoDB fournie
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
     
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/category', CategoryRoutes );
//app.use('/api/roomMeeting', meetingRoomRoutes);
//app.use('/api/bookings', BookingRoutes );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
