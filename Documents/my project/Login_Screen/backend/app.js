const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminActivityRoutes');
const userGrowth = require('./routes/userGrowthRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api/', adminRoutes);

app.use('/api/', userGrowth);


module.exports = app;
