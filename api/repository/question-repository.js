"use strict";

const Entity = require('../entity');

module.exports = class QuestionRepository 
{
    constructor(/*dbContext*/)
    {
        // TODO: pass dependencies thru constructor
        this._dbContext = require('./db-context');
    }

    async getQuestionAndAnswersByUserId(userId)
    {
        let text = 'select b.question_id, q.text as question_text '
            + ', a.id as answer_id, a.text as answer_text, a.rating as answer_rating '
            + 'from bootstrap b '
            + 'inner join question q on q.id = b.question_id '
            + 'inner join answer_for_question afq on afq.question_id = q.id '
            + 'inner join answer a on a.id = afq.answer_id '
            + 'where b.user_id = $1';
        let params = [userId];
        let result = await this._dbContext.query(text, params);

        if (result && result.rows.length > 0)
        {
            let entities = [];    
            for (let i = 0; i < result.rows.length; i++)
            {
                entities.push(new Entity.QuestionAndAnswers(result.rows[i].question_id, result.rows[i].question_text
                    , result.rows[i].answer_id, result.rows[i].answer_text, result.rows[i].answer_rating));
            }

            return entities;
        }
    }

    async getQuestionAndAnswersByAnswerId(answerId)
    {
        let text = 'select anq.question_id, q.text as question_text '
            + ', a.id as answer_id, a.text as answer_text, a.rating as answer_rating '
            + 'from answer_next_question anq '
            + 'inner join question q on q.id = anq.question_id '
            + 'inner join answer_for_question afq on afq.question_id = q.id '
            + 'inner join answer a on a.id = afq.answer_id '
            + 'where anq.answer_id = $1';
        let params = [answerId];
        let result = await this._dbContext.query(text, params);

        if (result && result.rows.length > 0)
        {
            let entities = [];    
            for (let i = 0; i < result.rows.length; i++)
            {
                entities.push(new Entity.QuestionAndAnswers(result.rows[i].question_id, result.rows[i].question_text
                    , result.rows[i].answer_id, result.rows[i].answer_text, result.rows[i].answer_rating));
            }

            return entities;
        }
    }
}