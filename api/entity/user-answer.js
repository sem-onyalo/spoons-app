"use strict";

module.exports = class UserAnswer
{
    constructor(seriesId, answerId, timestamp)
    {
        this.SeriesId = seriesId;
        this.AnswerId = answerId;
        this.Timestamp = timestamp;
    }
}