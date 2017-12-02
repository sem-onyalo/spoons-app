"use strict";

const Entity = require('../entity');

module.exports = class QuestionSeriesRepository
{
    constructor(/*dbContext*/)
    {
        // TODO: pass dependencies thru constructor
        this._dbContext = require('./db-context');
    }

    async get(seriesId)
    {
        let text = 'select id, user_id, series_timestamp from question_series where id = $1';
        let params = [seriesId];
        let result = await this._dbContext.query(text, params);

        if (result && result.rowCount)
        {
            return new Entity.QuestionSeries(result.rows[0].id, result.rows[0].user_id, result.rows[0].series_timestamp);
        }

        return undefined;
    }

    async save(questionSeries)
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