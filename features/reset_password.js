const { BotkitConversation } = require('botkit')

module.exports = function(controller) {
  controller.hears(
    message => message.intent === 'password_reset',
    'message',
    async (bot, message) => {
      await bot.reply(message, 'Will reset password')
    }
  )
}
