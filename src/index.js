const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const config = require('./config');
const app = express();

app.engine('ejs', engine);
app.set('port',process.env.PORT||3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));

app.use('/api',require('./router/init'));
app.use('/',require('./router/main'));

app.listen(app.get('port'),function(){
    console.log("run")
});