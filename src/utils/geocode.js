const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoazE5MzIiLCJhIjoiY2tjNzN5eHppMGg5ajJycDh4bWgyc3VnZiJ9.G7YTp-8ep-_p6GxEBjLrkg&limit=1'
    request({url, json: true }, (error, {body}) => {
        if (error)
            callback('Unable to Connect to goecode service', undefined)
        else if (body.features.length === 0)
            callback('Unable to find location, try another search', undefined)
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode
