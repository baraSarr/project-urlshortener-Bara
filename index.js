require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

let urlsShortened = [];

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  urlToShorten = req.body['url'];
  dns.lookup(urlToShorten, function(error, address, family) {
    if(error)
      res.json({error: "invalide url"});
    else {
      urlsShortened.push(urlToShorten);
      urlShortened = urlsShortened.length;
      res.json({original_url: urlToShorten, short_url: urlShortened});
    }
  });
  
});

app.get('/api/shorturl/:url', function(req, res) {
  shortUrl = parseInt(req.params.url);
  destinationUrl = urlsShortened[shortUrl-1];
  res.redirect(destinationUrl);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
