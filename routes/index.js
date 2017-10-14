"use strict";

const application = require('../package.json');

const _dbContext = require('../repository/db-context');

module.exports = (app) => {
    app.route('/')
        .get((req, res) => {
            res.json('Spoons Web Service v' + application.version);
        });

    app.route('/ping')
        .get(async (req, res) => {
            let result = await _dbContext.ping();
            console.log(result);
            let message = !result ? 'DOWN' : 'UP';
            res.json('Database is ' + message);
        });
}