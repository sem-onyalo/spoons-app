"use strict";

const Entity = require('../entity');
const Exception = require('../../exception');
const Model = require('./model');
const Repository = require('../repository');
const SystemHelper = require('../../util/system-helper');

module.exports = class SeriesInteractor
{
    constructor(/*answerRepository, questionRepository, questionSeriesRepository*/)
    {
        // TODO: pass dependencies in constructor
        this._answerRepository = new Repository.AnswerRepository();
        this._questionRepository = new Repository.QuestionRepository();
        this._questionSeriesRepository = new Repository.QuestionSeriesRepository();
    }

    async startSeries(startSeriesRequest)
    {
        let questionAndAnswers = await this._questionRepository.getQuestionAndAnswersByUserId(startSeriesRequest.UserId);
        this.validateQuestionAndAnswers(questionAndAnswers, 'There are no questions and/or answers for the specified user');

        let seriesId = SystemHelper.newGuid();
        let series = new Entity.QuestionSeries(seriesId, startSeriesRequest.UserId);
        series = await this._questionSeriesRepository.save(series);
        if (!series) throw new Exception.ApplicationError('Could not start question series');

        let question = new Entity.Question(questionAndAnswers[0].QuestionId, questionAndAnswers[0].QuestionText);
        let answers = this.buildAnswersList(seriesId, questionAndAnswers);

        let response = new Model.StartSeriesResponse(seriesId, question, answers);
        return response;
    }

    async resumeSeries(resumeSeriesRequest)
    {
        let series = await this._questionSeriesRepository.get(resumeSeriesRequest.SeriesId);
        if (!series) throw new Exception.ApplicationError('The specified series does not exist');

        let userAnswer = new Entity.UserAnswer(series.Id, resumeSeriesRequest.AnswerId);
        userAnswer = await this._answerRepository.save(userAnswer);
        if (!userAnswer) throw new Exception.ApplicationError('Could not save user\'s answer');

        let questionAndAnswers = await this._questionRepository.getQuestionAndAnswersByAnswerId(resumeSeriesRequest.AnswerId);
        this.validateQuestionAndAnswers(questionAndAnswers, 'There are no more questions for the specified series');

        let question = new Entity.Question(questionAndAnswers[0].QuestionId, questionAndAnswers[0].QuestionText);
        let answers = this.buildAnswersList(series.Id, questionAndAnswers);

        let response = new Model.ResumeSeriesResponse(series.Id, question, answers);
        return response;
    }

    // **************************************** //
    //              Helper Methods              //
    // **************************************** //

    validateQuestionAndAnswers(questionAndAnswers, errorMessage)
    {
        if (!questionAndAnswers || (questionAndAnswers && questionAndAnswers.length <= 0))
        {
            throw new Exception.ApplicationError(errorMessage);
        }
    }

    buildAnswersList(seriesId, questionAndAnswers)
    {
        let answers = [];
        for (let i = 0; i < questionAndAnswers.length; i++)
        {
            let answer = new Entity.Answer(questionAndAnswers[i].AnswerId, questionAndAnswers[i].AnswerText, questionAndAnswers[i].AnswerRating);
            answer.NextUrl = '/api/next/' + seriesId + '/answers/' + questionAndAnswers[i].AnswerId;
            answers.push(answer);
        }

        return answers;
    }
}