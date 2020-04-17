const express = require('express');
const utility = require('utility');
const app = express();

app.get('/', function (req, res) {
    let q = req.query.q || null;
    let md5Value = utility.md5(q);
    res.send('md5: ' + md5Value);
});

app.listen(5000, function () {
    console.log('app is running at port 5000');
});