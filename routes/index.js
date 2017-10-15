"use strict";

const application = require('../package.json');
const cors = require('cors');
const path = require('path');

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

    app.route('/summary-report')
        .get((req, res) => {
            res.sendFile('summary-report.htm', { root: './demo' });
        });

    app.route('/positivity-word-cloud')
        .get((req, res) => {
            res.sendFile('positivity-word-cloud.htm', { root: './demo' });
        });

    app.route('/chart-background.png')
        .get((req, res) => {
            res.sendFile('chart-background.png', { root: './demo' });
        });

    app.route('/data-3.csv')
        .get((req, res) => {
            res.sendFile('data-3.csv', { root: './demo' });
        });

    app.route('/cloud.js')
    .get((req, res) => {
        res.sendFile('cloud.js', { root: './demo' });
    });

    // app.route('/questions')
    //     .get(async (req, res) => {
    //         try {
    //             let response = _getQuestionsInteractor.execute();

    //         } catch (ex) {

    //         }
    //     });

    app.use((req, res) => {
        res.status(400).send({ error: req.originalUrl + ' not found' });
    });
}