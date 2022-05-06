const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const sportsRoutes = require('./routes/sportsRoutes');
const axios = require("axios");

const app = express();

app.listen(process.env.PORT || 3000, console.log("working"));

// register view engine configuration
app.set('view engine', 'ejs')

// register middleware configuration
app.use(morgan('dev'))

// register static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

app.get('/', (req,res) => {
    res.redirect('home');
});

app.get('categories/', (req,res) => {
    res.redirect('categories');
});

app.get('/home', (req,res) => {
    res.render('home', { title: 'Home'});
});

// Categories routes
app.use('/categories', sportsRoutes);

app.get('/about-us', (req,res) => {
    res.render('about-us', { title: 'About-us'});
});

app.get('/contact-us', (req,res) => {
    res.render('contact-us', { title: 'Contact-us'});
});

app.use((req,res) => {
    res.render('404', { title: '404-Error' });
});
