const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}:${req.method} - ${req.url}`;
    console.log(log); // directory log first need to be created
    fs.appendFile('./log/server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));
// console.log(__dirname);

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() 
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        
    })
});



app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
        
    });
});
// Simulating Error, error come in form of an object
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page'
    });
});
   
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});