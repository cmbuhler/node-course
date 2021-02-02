const axios = require('axios')
const chalk = require('chalk')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

if (process.argv.length === 3) {
    geocode(process.argv[2], (error, geo_data) => {
        if (error) {
            return console.log(chalk.red('Error:'), error)
        } 

        forecast(geo_data.lat, geo_data.lon, (error, weather_data) => {
            if (error) {
                return console.log(chalk.red('Error:'), error)
            }

            console.log("The weather in " + chalk.green(geo_data.place_name) + ' is ' + weather_data.description 
                        + '. The teperature is ' + weather_data.temperature + ' degrees celcius and feels like '
                        + weather_data.feelslike + ' degrees celcius.' )
        })
        
    })
} else if ( process.argv.length < 3) {
    console.log(chalk.red("Error: no location argument specified."))
} else {
    console.log(chalk.red("Error: could not parse command line options, please try again."))
}


