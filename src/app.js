const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dotenv = require('dotenv')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

dotenv.config()

const app  = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        paragraph: 'Search for today\'s report 🌦️'
    })
})

app.get('/more', (req, res) => {
    res.render('more', {
        title: 'More',
        paragraph: 'There\'s nothing here for now'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        paragraph: 'Weather app using Mapbox API to convert location into its co-ordinates and then passing it to Weatherstack API to get weather data, hosted on Render'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a location! 💩'
        })
    }
    const address = req.query.search
    geocode(address, (error, data) => {
        if (error)
            return res.send({error})
    
        forecast({ lat: data.lat, long: data.long }, (error, forecast) => {
            if (error)
                return res.send({error})
            return res.send({
                    input: req.query.search,
                    forecast: forecast,
                    location: data.location
                }
            )
        })
    })
})


app.get('/more/*', (req, res) => {
    res.render('404', {
        title: '404',
        paragraph: 'File not found 💩'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        paragraph: 'Page not found 💩'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port '+port );
    
})