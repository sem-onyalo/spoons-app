"use strict";

module.exports = class ApplicationError extends Error 
{
    constructor(...params) 
    {
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) 
        {
            Error.captureStackTrace(this, ApplicationError);
        }
    }
}