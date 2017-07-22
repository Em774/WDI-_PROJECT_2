const express        = require('express');
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');
mongoose.Promise     = require('bluebird');
// const session        = require('express-session');
// const flash          = require('express-flash');
const { port, db }   = require('./config/env');
const routes         = require('./config/routes');
const app            = express();


mongoose.connect(db);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use(routes);
app.listen(port, () => console.log(`Express up and running on port: ${port}`));
