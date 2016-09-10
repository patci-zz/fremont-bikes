var express = require('express'),
    requestProxy = require('express-request-proxy'),
    port = process.env.PORT || 3000,
    app = express();

    app.get('*', function(req, res) {
      console.log('New request:', req.url);
      res.sendFile('index.html', {root: '.'});
    });

    app.listen(port, function() {
      console.log('Server started on port', port, '!');
    });

    var proxyBikes = function(req, res) {
      console.log('Routing Socrata request for:', req.params[0]);
      (requestProxy({
          url: 'https://data.seattle.gov/resource/4xy5-26gy.json',
          headers: {X-App-Token: process.env.BIKE_TOKEN}
      }))(req, res);
    };
