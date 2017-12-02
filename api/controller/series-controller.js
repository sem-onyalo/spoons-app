"use strict";

const Interactor = require('../interactor');
const Model = require('../interactor/model');

exports.startSeries = async (req, res) =>
{
    try
    {
        let interactor = new Interactor.SeriesInteractor();
        let request = new Model.StartSeriesRequest(req.params.userId);
        let response = await interactor.startSeries(request);
        response.Status = { Code: 200, Text: 'OK' };
        res.json(response);
    }
    catch (ex)
    {
        console.error(ex);
        res.json({ Status: { Code: 500, Text: typeof ex === 'string' ? ex : ex.message } });
    }
}

exports.resumeSeries = async (req, res) =>
{
    try
    {
        let interactor = new Interactor.SeriesInteractor();
        let request = new Model.ResumeSeriesRequest(req.params.seriesId, req.params.answerId);
        let response = await interactor.resumeSeries(request);
        response.Status = { Code: 200, Text: 'OK' };
        res.json(response);
    }
    catch (ex)
    {
        console.error(ex);
        res.json({ Status: { Code: 500, Text: typeof ex === 'string' ? ex : ex.message } });
    }
}