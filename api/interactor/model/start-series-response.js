"use strict";

module.exports = class StartSeriesResponse
{
    constructor(seriesId, question, answers)
    {
        this.SeriesId = seriesId;
        this.Question = question;
        this.Answers = answers;
    }
}