const request = require('request')

const forecast = (data, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=305a5a3ec681937b55f46691920aa2e9&query=' + data.lat + ',' + data.long + '&units=m'

    request({url, json: true},(error, {body}) => { 
        if (error)
            callback('Unable to Connect to weather service', undefined)
        else if (body.error) {
            callback('Unable to fetch weather for given location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', Today\'s temperature is ' + body.current.temperature + '°C and it feels like ' + body.current.feelslike + '°C')
        }  
        
    })
}

module.exports = forecast
