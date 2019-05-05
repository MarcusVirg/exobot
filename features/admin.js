const { BotkitConversation } = require('botkit')

module.exports = function(controller) {
  const onboarding = new BotkitConversation('onboarding', controller)

  onboarding.say(
    'Hello and welcome to Resplice! I will walk you through setting up an account with us'
  )
  onboarding.ask('What is your first and last name?', answer => {}, {
    key: 'name'
  })
  onboarding.ask(
    'That is a nice name.\nDo you have a phone number and an email address?',
    [
      {
        pattern: 'yes',
        handler: async (answer, convo, bot) => {
          await convo.gotoThread('has_attributes')
        }
      },
      {
        pattern: 'no',
        handler: async (answer, convo, bot) => {
          await convo.gotoThread('no_attributes')
        }
      }
    ],
    { key: 'attributes' }
  )

  onboarding.addMessage('Great! We can continue', 'has_attribute')
  onboarding.addMessage(
    'Oh no... Unfortunately you will need an email and a phone number to create an account with us.\nWe require these to verify you are real and so you have some information to share right away.\nCome back to me when you get with the times and get a phone with an email.',
    'no_attributes'
  )
  onboarding.after((results, bot) => {
    const name = results.name
    bot.reply(
      `Thank you, ${name}. We have created your account and you can sign in at [app.resplice.com](https://app.resplice.com)`
    )
  })
  controller.addDialog(onboarding)

  controller.hears(
    message => message.intent === 'register',
    'message',
    (bot, message) => {
      bot.beginDialog('onboarding')
    }
  )

  controller.hears(
    message => message.intent === 'password_reset',
    'message',
    async (bot, message) => {
      await bot.reply(message, 'Will reset password')
    }
  )
}
