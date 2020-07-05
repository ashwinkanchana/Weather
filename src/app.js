const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


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
        paragraph: 'This is home page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        paragraph: 'This is help page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        paragraph: 'This is about page'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a location'
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


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        paragraph: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        paragraph: 'NOT FOUND'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port '+port );
    
})