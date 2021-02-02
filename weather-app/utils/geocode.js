const axios = require('axios')
const secrets = require('../secrets')

const geocode = (address, callback) => {
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + secrets.mapbox_api_key + '&limit=1'

    axios.get(mapbox_url).then((response) =>{
        const {features} = response.data
        if (features == undefined || features.length <= 0) {
            callback('No matching results for location search terms. Please try another search.', undefined)
        } else {
            const {center, place_name} = features[0]
            callback(undefined, {
                lat: center[1],
                lon: center[0],
                place_name: place_name
            })
        }
    }).catch((error) => {
        callback('Failed to load location data.', undefined);
    })
}

module.exports = geocode