"use strict";

module.exports = class ResumeSeriesRequest
{
    constructor(seriesId, answerId)
    {
        this.SeriesId = seriesId;
        this.AnswerId = answerId;
    }
}