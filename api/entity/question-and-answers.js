"use strict";

module.exports = class QuestionAndAnswers
{
    constructor (questionId, questionText, answerId, answerText, answerRating)
    {
        this.QuestionId = questionId;
        this.QuestionText = questionText;
        this.AnswerId = answerId;
        this.AnswerText = answerText;
        this.AnswerRating = answerRating;
    }
}