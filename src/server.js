const express = require("express");

const { PORT } = require('./config/env');

const authorRoutes = require('./routes/authors.routes')

const app = express();

app.use(express.json());
app.use(authorRoutes);

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});