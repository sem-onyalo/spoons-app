"use strict";

const Entity = require('../entity');
const Exception = require('../../exception');
const Model = require('./model');
const Repository = require('../repository');
const SystemHelper = require('../../util/system-helper');

module.exports = class SeriesInteractor
{
    constructor(/*questionRepository, questionSeriesRepository*/)
    {
        // TODO: pass dependencies in constructor
        this._questionRepository = new Repository.QuestionRepository();
        this._questionSeriesRepository = new Repository.QuestionSeriesRepository();
    }

    async startSeries(startSeriesRequest)
    {
        let questionAndAnswers = await this._questionRepository.getQuestionAndAnswersByUserId(startSeriesRequest.UserId);

        if (!questionAndAnswers || (questionAndAnswers && questionAndAnswers.length <=0 ))
        {
            throw new Exception.ApplicationError('There are no questions and/or answers for the specified user');
        }

        let seriesId = SystemHelper.newGuid();
        let series = new Entity.QuestionSeries(seriesId, startSeriesRequest.UserId);
        series = this._questionSeriesRepository.create(series);

        if (!series)
        {
            throw new Exception.ApplicationError('Could not start question series');
        }

        let answers = [];
        let question = new Entity.Question(questionAndAnswers[0].QuestionId, questionAndAnswers[0].QuestionText);

        for (let i = 0; i < questionAndAnswers.length; i++)
        {
            answers.push(new Entity.Answer(questionAndAnswers[i].AnswerId, questionAndAnswers[i].AnswerText, questionAndAnswers[i].AnswerRating));
        }

        let response = new Model.StartSeriesResponse(seriesId, question, answers);

        return response;
    }

    // async resumeSeries(resumeSeriesRequest)
    // {

    // }
}