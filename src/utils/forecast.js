const request = require('request')


const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=5cacffedcd8dcf2fc66e9861a35833a6&query=' + latitude + ',' + longitude + '&units=f'
request({url, json: true}, (error, {body} ) => {
if(error){
callback("Unable to connect to Weather Service.")
}else if (body.success === false) {
    callback(body.error.info)
}
else{
callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " +body.current.feelslike+ " degrees doe.")
}
})

}

module.exports = forecast