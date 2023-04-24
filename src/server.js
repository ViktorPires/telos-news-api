const express = require("express");

const { PORT } = require('./config/env');

const app = express();

app.use("/", (request, response) => {
    console.log(`Method: ${request.method}`);
    console.log(request.headers);
    console.log(`URL Accessed: ${request.url}`);
    response.end("Telos - News API");
});

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});