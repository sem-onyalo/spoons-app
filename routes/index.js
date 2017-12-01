"use strict";

const apiRoutes = require('../api/routes');
const application = require('../package.json');
const cors = require('cors');
const path = require('path');

module.exports = (app) => 
{
    // app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
    // app.options('*', cors());

    apiRoutes(app);

    app.route('/')
        .get((req, res) => 
        {
            res.json('Spoons Web Service v' + application.version);
        });

    app.use((req, res) => 
    {
        res.status(400).send({ error: req.originalUrl + ' not found' });
    });
}