const { BotkitConversation } = require('botkit')

module.exports = function(controller) {
  const onboarding = new BotkitConversation('ONBOARDING', controller)

  onboarding.say(
    'Hello and welcome to Resplice! I will walk you through setting up an account with us'
  )

  onboarding.ask(
    'What is your first and last name?',
    async (response, convo, bot) => {},
    'name'
  )

  onboarding.say(`{{vars.name}}. That is a nice name!`)

  onboarding.ask(
    'Do you have a phone number and an email address?',
    [
      {
        pattern: 'no',
        handler: async (response, convo, bot) => {
          await convo.gotoThread('no_attributes')
        }
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await convo.gotoThread('has_attributes')
        }
      }
    ],
    'has_attributes'
  )

  onboarding.addMessage(
    'Oh no... Unfortunately you will need an email and a phone number to create an account with us.\nWe require these to verify you are real and so you have some information to share right away.\nCome back to me when you get with the times and get a phone with an email.',
    'no_attributes'
  )

  onboarding.addMessage('Great! We can continue', 'has_attributes')
  onboarding.addQuestion(
    'Can you please enter your phone number?',
    async (response, convo, bot) => {},
    'phone',
    'has_attributes'
  )
  onboarding.addQuestion(
    'Thanks! We have a sent a text to {{vars.phone}} with a verification code. Can you please enter the verification code here?',
    async (response, convo, bot) => {
      if (response === '000') {
        await convo.gotoThread('verify_fail')
      }
    },
    'phone_verify',
    'has_attributes'
  )
  onboarding.addQuestion(
    'Your phone has been verified! Can you please enter your email address?',
    async (response, convo, bot) => {},
    'email',
    'has_attributes'
  )
  onboarding.addQuestion(
    'Thanks! We have send an email to {{vars.email}} with a verification code. Can you please enter the verification code here?',
    async (response, convo, bot) => {
      if (response === '000') {
        await convo.gotoThread('verify_fail')
      }
    },
    'email_verify',
    'has_attributes'
  )
  onboarding.addMessage(
    { text: 'Your email has been verified!', action: 'password_set' },
    'has_attributes'
  )

  onboarding.addQuestion(
    'Oh no :(, looks we have failed to verify your attributes, this may be because you have entered an incorrect verification code or a code could not be sent. Would you like to try again?',
    [
      {
        pattern: 'yes',
        handler: async (response, convo, bot) => {
          await convo.gotoThread('has_attributes')
        }
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await convo.gotoThread('quit_onboarding')
        }
      }
    ],
    'retry',
    'verify_fail'
  )
  onboarding.addMessage(
    { text: 'Exiting registration process...', action: 'stop' },
    'quit_onboarding'
  )

  onboarding.addQuestion(
    'You are almost done and ready to start using Resplice. We just have to set a password for your account. Please enter a password.',
    async (response, convo, bot) => {},
    'password',
    'password_set'
  )

  controller.addDialog(onboarding)
  controller.afterDialog(onboarding, async (bot, results) => {
    console.log(results)
    const name = results.name
    if (results._status === 'canceled') {
      await bot.say(
        `${name}. It looks like the account creation process was canceled or an error has occured. You can go to [app.resplice.com](https://app.resplice.com) to register an account with us.`
      )
    } else {
      await bot.say(
        `Thank you, ${name}. We have created your account and you can sign in at [app.resplice.com](https://app.resplice.com)`
      )
    }
  })

  controller.hears(
    message => message.intent === 'register',
    'message',
    async (bot, message) => {
      await bot.beginDialog('ONBOARDING')
    }
  )
}
