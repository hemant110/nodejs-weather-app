const request = require("postman-request");

const forecast = ({latitude, longitude}, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=674baca31cbe380cf90678a3c88bb3f2&query=" +
    latitude +","+longitude +
    "&units=f";

  request(url, { json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (body.error) {
      callback("Please provide correct location", undefined);
    } else {
        callback(undefined, body.current);
    }
  });
};


module.exports = forecast;