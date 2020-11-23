'use strict'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'

import graphqlSchema from './schemas'

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
  graphqlHTTP({
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
