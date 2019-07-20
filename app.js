const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const errorController = require('./controllers/errors')
const db = require('./utils/database')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRoutes)
app.use(userRoutes)
app.use(errorController.get404)


app.listen(3000)