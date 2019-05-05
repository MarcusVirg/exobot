module.exports = function(controller) {
  controller.hears(
    message => message.intent === 'greetings',
    'message',
    async (bot, message) => {
      bot.reply(
        message,
        "Hello there my fellow Genosse! Welcome to Resplice, the world's best contact management application"
      )
    }
  )

  controller.hears(
    message => message.intent === 'description',
    'message',
    async (bot, message) => {
      await bot.reply(
        message,
        'I am the destroyer of out-of-date contact information!! Muhahahaha!'
      )
      await bot.reply(
        message,
        'On a more serious note, I am the Resplice bot. I can help you manage your shares and contacts or assist with you with your Resplice account.'
      )
      await bot.reply(message, {
        text: 'Type help or select the reply below to see my functionality.',
        quick_replies: [
          {
            title: 'Help',
            payload: 'help'
          }
        ]
      })
    }
  )

  controller.hears(
    message => message.intent === 'help',
    'message',
    async (bot, message) => {
      bot.reply(message, {
        text: 'Sure, I can help you out.\nWhat would you like to do?',
        quick_replies: [
          {
            title: 'Create an account',
            payload: 'register'
          },
          {
            title: 'Reset my password',
            payload: 'password_reset'
          },
          {
            title: 'Find a contact',
            payload: 'search'
          },
          {
            title: 'Share information',
            payload: 'sharing_send'
          }
        ]
      })
    }
  )
}
