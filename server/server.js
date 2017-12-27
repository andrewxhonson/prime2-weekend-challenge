const express = require('express');
const app = express();
const port = 4321;

app.use(express.static('server/public'));
//app.use(express.urlencoded({extended: true}));


app.listen(port, function() {
    console.log('listening on', port);
});