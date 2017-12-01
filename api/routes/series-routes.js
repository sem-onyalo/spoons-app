"use strict";

module.exports = (app) => 
{
    let controller = require('../controller/series-controller');
    
    app.route('/api/start/:userId')
        .post(controller.startSeries);
}