/*
  app.js -- This creates an Express webserver with login/register/logout authentication
*/

// *********************************************************** //
//  Loading packages to support the server
// *********************************************************** //
// First we load in all of the packages we need for the server...
const createError = require("http-errors"); // to handle the server errors
const express = require("express");
const axios = require("axios");
const path = require("path");  // to refer to local paths
const cookieParser = require("cookie-parser"); // to handle cookies
const session = require("express-session"); // to handle sessions using cookies
const bodyParser = require("body-parser"); // to handle HTML form input
const debug = require("debug")("personalapp:server"); 
const layouts = require("express-ejs-layouts");
const methodOverride = require('method-override');

// *********************************************************** //
//  Connecting to the database
// *********************************************************** //

const mongoose = require( 'mongoose' );
const mongodb_URI = 'mongodb+srv://richmond:password123.@cluster0.gymvd.mongodb.net/blog?retryWrites=true&w=majority'
//const mongodb_URI = 'mongodb+srv://cs_sj:BrandeisSpr22@cluster0.kgugl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect( mongodb_URI, { useNewUrlParser: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});
module.exports = db;

// *********************************************************** //
// Initializing the Express server 
// This code is run once when the app is started and it creates
// a server that respond to requests by sending responses
// *********************************************************** //
const app = express();

// Here we specify that we will be using EJS as our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride('_method'));


// this allows us to use page layout for the views 
// so we don't have to repeat the headers and footers on every page ...
// the layout is in views/layout.ejs
app.use(layouts);

// Here we process the requests so they are easy to handle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Here we specify that static files will be in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Here we enable session handling using cookies
app.use(
  session({
    secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
    resave: false,
    saveUninitialized: false
  })
);

// *********************************************************** //
//  Defining the routes the Express server will respond to
// *********************************************************** //


// here is the code which handles all /login /signin /logout routes
const inventoryRoute = require("./routes/inventory");
app.use("/api/inventory",inventoryRoute);
const shipmentRoute = require("./routes/shipment");
app.use("/api/shipment",shipmentRoute);


// specify that the server should render the views/index.ejs page for the root path
// and the index.ejs code will be wrapped in the views/layouts.ejs code which provides
// the headers and footers for all webpages generated by this app
app.get("/", 
  async (req, res, next) => {
    // req.url = '/api/inventory'
    const inventoriesRes = await axios.get("http://localhost:5001/api/inventory")
    const shipmentsRes = await axios.get("http://localhost:5001/api/shipment")
    res.locals.inventories = inventoriesRes.data
    res.locals.shipments = shipmentsRes.data
    res.render("index")
  }
);

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/demopage", (req, res, next) => {
  res.render("demo");
});

app.get("/inventories", 
  async (req, res, next) => {
    // req.url = '/api/inventory'
    const ress = await axios.get("http://localhost:5001/api/inventory")
    res.locals.inventories = ress.data
    res.render("inventories")
  }
);

app.get("/inventory/edit/:id", 
  async (req, res, next) => {
    const id = req.params.id;
    const ress = await axios.get(`http://localhost:5001/api/inventory/${id}`)
    res.locals.inventory = ress.data
    res.render("editInventory")
  }
);

app.get("/inventory/new", 
  async (req, res, next) => {
    res.render("newInventory")
  }
);
app.get("/inventory/delete/:id", 
  async (req, res, next) => {
    const id = req.params.id;
    const ress = await axios.delete(`http://localhost:5001/api/inventory/${id}`)
    res.render("index")
  }
);

app.get("/shipment/edit/:id", 
  async (req, res, next) => {
    const id = req.params.id;
    const ress = await axios.get(`http://localhost:5001/api/shipment/${id}`)
    res.locals.shipment = ress.data
    res.render("editShipment")
    
  }
);

app.get("/shipment/new", 
  async (req, res, next) => {
    res.locals.func = (input)=>{
      console.log(input)
    }
    const ress = await axios.get("http://localhost:5001/api/inventory")
    res.locals.inventories = ress.data
    res.render("newShipment")
  }
);
app.get("/shipment/delete/:id", 
  async (req, res, next) => {
    const id = req.params.id;
    const ress = await axios.delete(`http://localhost:5001/api/shipment/${id}`)
    res.render("index")
  }
);

// here we catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// this processes any errors generated by the previous routes
// notice that the function has four parameters which is how Express indicates it is an error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// *********************************************************** //
//  Starting up the server!
// *********************************************************** //
//Here we set the port to use between 1024 and 65535  (2^16-1)
const port = "5001";
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const server = http.createServer(app);

server.listen(port);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);

server.on("listening", onListening);

module.exports = app;
