const axios = require('axios')
const secrets = require('../secrets')

const forecast = (lat, lon, callback) => {
    const weather_url = 'http://api.weatherstack.com/current?access_key=' + secrets.weather_api_key + '&query=' + lat + ',' + lon

    axios.get(weather_url).then((response) => {
        if (response.data.error) {
            callback('Unable to find location.', undefined)
        } else {
            const {temperature, feelslike, weather_descriptions} = response.data.current
            callback(undefined, {
                temperature: temperature,
                feelslike: feelslike,
                description: weather_descriptions[0]
            })
        }
    }).catch((error) => {
        callback('Failed to load weather data.', undefined)
    })
}

module.exports = forecast