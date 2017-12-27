const express = require('express');
const app = express();
const port = 4321;
const calculate = require('./modules/calculator');

let history = [];

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

app.post('/calculate', function(req, res) {
    let result = calculate(req.body.x, req.body.y, req.body.operation);
    console.log('RESULT', result);
    history.push(result);
    res.sendStatus(200);
});

app.get('/calculate', function(req, res) {
    res.send(history);
});

app.listen(port, function() {
    console.log('listening on', port);
});
