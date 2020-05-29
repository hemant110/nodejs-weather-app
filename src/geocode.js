const request = require('postman-request');


const geocode = (address, callback) => {
    const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiaG9uZXkxMTAiLCJhIjoiY2thanhoaW5yMDlwODJybHBud250NGNtaSJ9.JsEfjvVwiVC1EesMEP4TWQ&limit=1";

    request(urlGeo, {json:true} ,(error, {body}) => {
        if(error) {
            callback('Unable to connect to server', undefined);
        }else if(body.features.length === 0) {
            callback('unable to find location', undefined);
        }else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;