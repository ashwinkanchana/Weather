const request = require('request')

const forecast = (data, callback) => { 
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=` + data.lat + ',' + data.long + '&units=m'

    request({url, json: true},(error, {body}) => { 
        if (error)
            callback('Unable to Connect to weather service', undefined)
        else if (body.error) {
            callback('Unable to fetch weather for given location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', Today\'s temperature is ' + body.current.temperature + '°C ' + ' with wind speed of ' + body.current.wind_speed + 'km/h and ' + body.current.humidity+'% humidity' )
        }  
        
    })
}

module.exports = forecast
