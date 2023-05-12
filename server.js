'use strict';
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const fileupload = require('express-fileupload');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

const { errorHandler, notFoundHandler } = require('./middleware');

// config file setup for access all configuration from process variable
dotenv.config({ path: './config/config.env' });

const { DbConnect } = require('./Database');
// connect database
DbConnect();

// express application object
const app = new express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Prevent XSS attack
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Minites
  max: 1000,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS site
app.use(cors());

// setup request logger on development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const swaggerOptions = {
  swaggerDefinition: {
    swagger:"2.0",
    info:{
      version:"1.0.0",
      title: "Car Wash API",
      description: "API's to manage Car Wash",
      servers: ["http://localhost:5000"],
    },
    basePath:"/",
    "paths": { },
    "definitions": { },
    "responses": { },
    "parameters": { },
    "securityDefinitions": { }
  },
  apis:['./swagger/auth.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));


// File Uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Sanitize data for mongoose injection
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Routes
const { router } = require('./api');

app.use('/', router);

// Error handler middleware
app.use(errorHandler);

// Not found URL Handler (if request not match default call notFoundHandler middleware)
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

// Listen server on port
app.listen(PORT, error => {
  if (error) {
    console.log('An error occurred while starting the server on port %d', PORT);
    return process.exit(1);
  }
  console.log(`API running on port http://localhost:${PORT}`);
});
