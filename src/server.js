const express = require("express");

require("./config/database");

const { PORT } = require('./config/env');

const authorRoutes = require('./routes/authors.routes');
const newsRoutes = require('./routes/news.routes');
const authenticateRoutes = require('./routes/authenticate.routes');


const app = express();

app.use(express.json());
app.use(authorRoutes);
app.use(newsRoutes);
app.use(authenticateRoutes);

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});