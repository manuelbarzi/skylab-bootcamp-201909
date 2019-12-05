const { validate, errors: { NotFoundError, ContentError } } = require('flott-util')
const { models: { Spot, User } } = require('flott-data')

/**
* Retrieve all spots
*  
* @param {Array} userCoordinates
* @param {Number} radius
* @param {string} spotName
* @param {Array} sports
* @param {Array} spotTags
* 
* @return {Promise}
* @return {Array} id Returns an array with all results
*/

module.exports = function (userCoordinates, radius, spotName, sports, spotTags, numFavs, fountain, supermarket, publicTransport, parking ) {
    userCoordinates ? validate.array(userCoordinates) : userCoordinates = [41,2]
    radius ? validate.number(radius) : radius = 130000
    sports ? validate.array(sports) : sports = ['skate','longboard','roller','scooter','bmx']

    radius && validate.number(radius, 'radius')
    if(spotName){
        validate.string(spotName)
        validate.string.notVoid('spotName', spotName)
    }else{
        spotName = " "
    }
    spotTags ? validate.array(spotTags) : sportTags = " "

    return (async () => {

        const spots = await Spot.find({$and:[
                                        { location: { $nearSphere: { $geometry: { type: "Point", coordinates: userCoordinates },$maxDistance: radius } }},
                                        {"modalities": {$in: sports}},
                                        { $or:[ 
                                            { "name" : {$regex : `.*${spotName}*`}},
                                            { "tags": {$in: spotTags}}]
                                        }]}).populate('creator').sort({ 'totalFavs' : 1}).lean()
        // const spots = await Spot.find().populate('creator')

        let results = []
        spots.forEach(elem => {
            const { name, tags, modalities, images, totalFavs, creator: {username, image: userImage} } = elem
            let place = { name, tags, modalities, images, totalFavs, username, userImage }

            results.push(place)
        })
        return results
    })()
}
