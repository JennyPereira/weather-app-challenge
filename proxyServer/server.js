import express from 'express';
const app = express();
import fetch from 'node-fetch';
import cors from 'cors';

const APIurl = (apiUrl) => {
    app.use(cors());

    app.get('/', async(req, res) => {
        const response = await fetch(apiUrl);
        res.json(await response.json());
    });

    app.listen(3000, ( ) => {

    })
} 

