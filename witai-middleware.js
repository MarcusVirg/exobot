const { Wit, log } = require('node-wit')

module.exports = function(config) {
  if (!config || !config.token) {
    throw new Error('No wit.ai API token specified')
  }

  if (!config.minimum_confidence) {
    config.minimum_confidence = 0.5
  }

  // wit with logger
  // const wit = new Wit({
  //   accessToken: config.token,
  //   logger: new log.Logger(log.DEBUG)
  // })

  const wit = new Wit({
    accessToken: config.token
  })

  const middleware = {}

  middleware.ingest = async function(bot, message, next) {
    if (message.text) {
      try {
        // Pass the user's message to wit for classification
        const data = await wit.message(message.text)

        // Add wit entities to message
        message.entities = data.entities

        // Add wit intent to the message
        if (
          data.entities['intent'] &&
          data.entities['intent'][0].confidence >= config.minimum_confidence
        ) {
          message.intent = data.entities['intent'][0].value
        }

        next()
      } catch (err) {
        next(err)
      }
    }
  }

  return middleware
}
