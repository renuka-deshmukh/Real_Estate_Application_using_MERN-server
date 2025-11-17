const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoute = require('./routes/userRoute')
const propertyRoute = require('./routes/propertyRoute')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/user', userRoute);
app.use('/property', propertyRoute)
app.use('/download', express.static(path.join('uploads')));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))