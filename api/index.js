const express = require('express')
const bodyParser = require("body-parser");
// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// Import API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
