const { ObjectId, models: { User } } = require('wishare-data')
const { validate, errors: {NotFoundError} } = require('wishare-util')

/**
 * Retrieves users that matches the email with the query provided.
 * 
 *@param {String} email of user that want to be searched
 *
 *@returns {Promise} with friends matched
 */

 module.exports = function (query) {

    validate.string(query)
    validate.string.notVoid('query', query)

    return (async () => {

        let users = await User.find({ "email" : {$regex : `.*${query}*`}})

        if (users.length === 0) throw new NotFoundError(`user with email ${query} not found`)

        return users
    })()
}