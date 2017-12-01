"use strict";

const Entity = require('../entity');

module.exports = class QuestionSeriesRepository
{
    constructor(/*dbContext*/)
    {
        // TODO: pass dependencies thru constructor
        this._dbContext = require('./db-context');
    }

    async create(questionSeries)
    {
        let text = 'insert into question_series (id, user_id) values ($1, $2) returning series_timestamp';
        let params = [questionSeries.Id, questionSeries.UserId];
        let result = await this._dbContext.query(text, params);

        if (result && result.rowCount > 0)
        {
            questionSeries.Timestamp = result.rows[0].series_timestamp;
            return questionSeries;
        }

        return undefined;
    }
}