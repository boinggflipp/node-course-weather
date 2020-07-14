
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'steph devine'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'please supply an address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) { return res.send({ error }) }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { return res.send({ error }) }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ 'error': 'you must supply a search term' })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'steph devine'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'steph devine'
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'steph devine',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'steph devine',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, () => console.log('Server is up on port 3000'))