//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the exobot bot.

// Import Botkit's core features
const { Botkit } = require('botkit')

// Import a platform-specific adapter for web.
const { WebAdapter } = require('botbuilder-adapter-web')
const { MongoDbStorage } = require('botbuilder-storage-mongodb')

// Load process.env values from .env file
require('dotenv').config()

// Import wit.ai middleware
const Wit = require('./witai-middleware')({
  token: process.env.WIT,
  minimum_confidence: 0.7
})

let storage = null
if (process.env.MONGO_URI) {
  storage = mongoStorage = new MongoDbStorage({
    url: process.env.MONGO_URI
  })
}

const adapter = new WebAdapter({})

const controller = new Botkit({
  debug: true,
  webhook_uri: '/api/messages',
  adapter: adapter,
  storage
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // Load wit.ai middleware
  controller.middleware.ingest.use(Wit.ingest)
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/features')
})
