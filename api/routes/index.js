"use strict";

const seriesRoutes = require('./series-routes');

module.exports = (app) =>
{
    seriesRoutes(app);
}