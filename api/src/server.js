'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const graphqlHttp = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')

const graphqlSchema = require('./schemas')

// Setup express server
const app = express()

// Setup environment variables
console.warn(
  `💚 Current environment set: ${process.env.NODE_ENV || 'development'}`,
)
let helmetOptions = { contentSecurityPolicy: false } // Check in production
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config({ path: '../.env.local' })
  helmetOptions = { contentSecurityPolicy: false }
}
const port = process.env.PORT

// Other app requirements
app.use(helmet({ ...helmetOptions }))
app.use(compression())
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

// Setup GraphQL
const gqlPath = '/graphql'

app.use(
  gqlPath,
  graphqlHttp({
    schema: graphqlSchema,
    // rootValue: graphqlResolvers,
    graphiql: true,
  }),
)

// MongoDB settings
console.warn(`🌐 Connecting to MongoDb on ${process.env.MONGODB_URL}`)
const uri = `mongodb://${process.env.MONGODB_URL}`
const options = {
  // user: `${process.env.MONGODB_USER}`,
  // pass: `${process.env.MONGODB_PWD}`,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Boot server with mongoose
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(port, console.warn(`🚀 The server started on port ${port} 🔥`)),
  )
  .catch(error => {
    throw error
  })
