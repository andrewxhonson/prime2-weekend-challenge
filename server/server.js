const express = require('express');
const app = express();
const port = 4321;
const calculate = require('./modules/calculator');

let history = [];

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

app.post('/calculate', function(req, res) {
    let result = calculate(req.body.x, req.body.y, req.body.operation);
    let info = {
        x: req.body.x,
        y: req.body.y,
        operation: req.body.operation,
        result: result
    }
    console.log('RESULT', result);
    history.push(info);
    res.sendStatus(200);
});

app.get('/calculate', function(req, res) {
    res.send(history);
});

app.delete('/clear', function(req, res) {
    history = [];
    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('listening on', port);
});
