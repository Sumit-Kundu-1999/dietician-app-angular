const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(cors({ origin: 'https://dietician-app-b3e0d.web.app' }));
app.use(express.json());

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected")
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDb();

console.log('Console');

app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => res.send('API Running'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));