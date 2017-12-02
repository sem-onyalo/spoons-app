"use strict";

module.exports = class ResumeSeriesResponse
{
    constructor(seriesId, question, answers)
    {
        this.SeriesId = seriesId;
        this.Question = question;
        this.Answers = answers;
    }
}