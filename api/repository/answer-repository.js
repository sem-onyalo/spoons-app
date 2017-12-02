"use strict";

const Entity = require('../entity');

module.exports = class AnswerRepository
{
    constructor(/*dbContext*/)
    {
        // TODO: pass dependencies thru constructor
        this._dbContext = require('./db-context');
    }

    async save(userAnswer)
    {
        let text = 'insert into user_answer (series_id, answer_id) values ($1, $2) returning answer_timestamp';
        let params = [userAnswer.SeriesId, userAnswer.AnswerId];
        let result = await this._dbContext.query(text, params);

        if (result && result.rowCount > 0)
        {
            userAnswer.Timestamp = result.rows[0].answer_timestamp;
            return userAnswer;
        }

        return undefined;
    }
}