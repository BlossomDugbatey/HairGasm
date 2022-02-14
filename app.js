//importing or requiring the essential dependencies
const express = require('express')
require("dotenv").config()
const ObjectId = require('mongodb').ObjectId
const globalErrorHandler = require('./server/controllers/errorController')
const AppError = require('./server/utils/appError')
const csrf = require('csurf')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
const expressLayouts = require('express-ejs-layouts');


const app = express()

//middleware for communication or connectivity
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
//cookie-parser
app.use(cookieParser())
// mounting express-session 
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors());

const csrfProtection = csrf({ cookie: false })
app.use(csrfProtection);

//setting our values for rendering views
app.set("layout", "./layouts/main")

//setting the engine we want to use (view engine)
app.set("view engine", "ejs")

//requiring routes for use(app/home)
const appRoute = require("./server/routes/pageRoutes")
app.use('/', appRoute)

//require user route
const bookingUserRoute = require("./server/routes/bookingRoutes")
app.use('/user',  bookingUserRoute)

//requiring routes for bookings(/booking)
const bookingRoute = require("./server/routes/bookingRoutes")
app.use('/booking', bookingRoute)

//requiring routes for slots(/slot)
const slotRoute = require("./server/routes/slotRoutes")
app.use('/slots', slotRoute)

//routes for login
const userRoute = require("./server/routes/userRoutes");
app.use('/', userRoute);

//requiring routes for logics
const logicRoute = require("./server/routes/logicRoutes")
app.use('/logics', logicRoute)

app.all('*', (req, res, next) => {
res.render('error/error')
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  console.error(err)
  res.status(500).render('error/500')
})
// app.use(globalErrorHandler);

//port 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server connected to port: ${PORT}`)
})
