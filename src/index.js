const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const app = express();

app.set('port',process.env.PORT||3000);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api',require('./router/init'));
app.use('/',require('./router/main'));

app.listen(app.get('port'),function(){
    console.log("run")
});