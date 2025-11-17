const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))