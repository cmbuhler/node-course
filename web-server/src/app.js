const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()

// Setup handlebars engine views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chase Buhler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chase Buhler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a help message on the help page!",
        title: 'Help',
        name: 'Chase Buhler' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, geo_data) => {
        if (error) {
            return res.send({
                error: error
            })
        } 

        const {lat, lon, place_name} = geo_data

        forecast(lat, lon, (error, weather_data) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            const {description, temperature, feelslike} = weather_data

            res.send({
                forecast: description + '. The temperature is ' + temperature + '°C and feels like '
                          + feelslike + '°C.',
                location: place_name,
                searchterm: req.query.address
            })
        }) 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Chase Buhler',
        title: '404 Page'
    })
})

app.listen(3000, () => {
    console.log('Server started correctly on port 3000')
})