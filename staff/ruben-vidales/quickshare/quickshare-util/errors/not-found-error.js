require('../polyfills/error-capture-stack-trace')
module.exports = class NotFoundError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, NotFoundError)

        this.name = NotFoundError.name
    }
}