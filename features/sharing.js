const { BotkitConversation } = require('botkit')

module.exports = function(controller) {
  const searchContacts = new BotkitConversation('SEARCH_CONTACTS', controller)

  searchContacts.say(
    'I can help you find your contacts and what they are sharing with you.'
  )

  searchContacts.ask(
    'What is the name of the person you are looking for?',
    async (response, convo, bot) => {
      // see if this contact is sharing anything with the user
      if (response === 'Citra') {
        await convo.gotoThread('no_contact')
      }
    },
    'contact'
  )

  searchContacts.say(
    '{{vars.contact}} is sharing 2 phone numbers, 1 email, and 1 address with you.'
  )

  searchContacts.addMessage(
    'Sorry {{vars.contact}} is not sharing any information with you',
    'no_contact'
  )

  controller.addDialog(searchContacts)

  controller.hears('search', 'message', async (bot, message) => {
    await bot.beginDialog('SEARCH_CONTACTS')
  })
  controller.hears(
    message => message.intent === 'sharing_get',
    'message',
    async (bot, message) => {
      let contact = null
      let attribute = null
      if (message.entities['contact']) {
        contact = message.entities['contact'][0].value
      }

      if (message.entities['attribute']) {
        attribute = message.entities['attribute'][0].value
      }

      const attribute_values = {
        email: 'coolperson18@gmail.com',
        phone: '612-342-2342',
        address: '1432 Free Ln, Minneapolis MN'
      }

      if (contact && attribute) {
        await bot.reply(
          message,
          `Yes, ${contact} is sharing their ${attribute} with you: ${
            attribute_values[attribute]
          }.`
        )
      } else if (contact) {
        if (contact === 'Marcus' || contact === 'marcus') {
          await bot.reply(
            message,
            `Sorry, ${contact} is not sharing any information with you.`
          )
        } else {
          await bot.reply(
            message,
            `${contact} is sharing 2 phone numbers, 1 email, and 1 address with you.`
          )
        }
      } else {
        await bot.reply(
          message,
          "It looks like you are trying to get sharing information but I don't recognize this person. Please enter a contacts name at the minimum"
        )
      }
    }
  )
}
