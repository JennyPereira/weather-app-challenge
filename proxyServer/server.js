import express from 'express';
const app = express();
import fetch from 'node-fetch';
import cors from 'cors';
app.use(cors());

app.get('/api/location/search/?', async(req, res) => {
    const response = await fetch(`https://www.metaweather.com/${req.url}`);
    res.json(await response.json());
});

app.get('/api/location/:id', async(req, res) => {
    const response = await fetch(`https://www.metaweather.com/api/location/${req.params.id}`);
    res.json(await response.json());
});

app.listen(3000, ( ) => {
    console.log("escuchandos")
}) 

